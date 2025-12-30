# Simple daily gallery update script
# Usage: .\update-gallery.ps1
# This script:
# 1. Scans the 'my photos' folder for new/modified images
# 2. Regenerates thumbnails for all images
# 3. Updates the images array in app.js
# 4. Commits and pushes to GitHub (if git repo exists)

param(
    [string]$PhotoDir = "my photos",
    [string]$ThumbDir = "thumbs",
    [int]$ThumbWidth = 800
)

Write-Host "📸 Gallery Update Script" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

# 1. Scan for image files
Write-Host "🔍 Scanning for images in '$PhotoDir'..." -ForegroundColor Yellow
$ImageExtensions = @("jpg", "jpeg", "png", "webp", "gif", "bmp")
$Images = Get-ChildItem -Path $PhotoDir -File -Recurse -ErrorAction SilentlyContinue | 
    Where-Object { $_.Extension.TrimStart(".").ToLower() -in $ImageExtensions } |
    Sort-Object Name |
    Select-Object -ExpandProperty Name

if ($Images.Count -eq 0) {
    Write-Host "❌ No images found in '$PhotoDir'" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found $($Images.Count) image(s)`n" -ForegroundColor Green

# 2. Regenerate thumbnails
Write-Host "🖼️  Generating thumbnails..." -ForegroundColor Yellow
if (-not (Test-Path $ThumbDir)) {
    New-Item -ItemType Directory -Path $ThumbDir -Force | Out-Null
    Write-Host "   Created '$ThumbDir' folder"
}

$FailedThumbs = @()
$Images | ForEach-Object {
    $InputFile = Join-Path $PhotoDir $_
    $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($_)
    $OutputFile = Join-Path $ThumbDir "$BaseName.webp"
    
    try {
        # Use ImageMagick to create thumbnail
        & magick "$InputFile" -resize $ThumbWidth -quality 80 "$OutputFile" 2>$null
        Write-Host "   ✓ $BaseName.webp" -ForegroundColor Gray
    } catch {
        $FailedThumbs += $_
        Write-Host "   ✗ $BaseName (failed)" -ForegroundColor Red
    }
}

if ($FailedThumbs.Count -gt 0) {
    Write-Host "`n⚠️  $($FailedThumbs.Count) thumbnail(s) failed to generate. Ensure ImageMagick is installed." -ForegroundColor Yellow
    Write-Host "   Run: choco install imagemagick (Windows)" -ForegroundColor Gray
} else {
    Write-Host "✅ All thumbnails generated`n" -ForegroundColor Green
}

# 3. Update images array in app.js
Write-Host "📝 Updating images array in app.js..." -ForegroundColor Yellow
$AppJsPath = "app.js"

if (Test-Path $AppJsPath) {
    # Build the images array as a JavaScript string (one image per line for readability)
    $ImagesArray = ($Images | ForEach-Object { "    '$_'" }) -join ",`n"
    
    # Read the current file
    $Content = Get-Content $AppJsPath -Raw
    
    # Replace the images array using a more robust regex that handles multi-line arrays
    # This matches from "const images = [" to the closing "];"
    $NewContent = $Content -replace "const images = \[\s*[\s\S]*?\n\];", "const images = [`n$ImagesArray`n];"
    
    # Write back
    Set-Content $AppJsPath $NewContent -NoNewline
    Write-Host "✅ Updated app.js with $($Images.Count) images`n" -ForegroundColor Green
} else {
    Write-Host "❌ app.js not found" -ForegroundColor Red
    exit 1
}

# 4. Commit and push (if git is available)
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    try {
        git add -A
        $CommitMsg = "Update gallery: $($Images.Count) images"
        git commit -m $CommitMsg 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            git push 2>&1 | Out-Null
            Write-Host "✅ Committed and pushed to GitHub`n" -ForegroundColor Green
        } else {
            Write-Host "ℹ️  No changes to commit" -ForegroundColor Gray
        }
    } catch {
        Write-Host "⚠️  Git push failed (check your credentials)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Git not found. Manual push required." -ForegroundColor Yellow
    Write-Host "   Run: git add -A && git commit -m 'Update gallery' && git push" -ForegroundColor Gray
}

Write-Host "`n🎉 Gallery update complete!`n" -ForegroundColor Cyan
Write-Host "   Your site will redeploy automatically if hosted on Netlify/Vercel.`n" -ForegroundColor Gray
