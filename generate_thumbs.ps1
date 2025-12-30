<#
PowerShell helper to generate thumbnails and WebP versions using ImageMagick.
Install ImageMagick (magick) and run from this folder:
.\generate_thumbs.ps1 -InputDir 'my photos' -ThumbDir 'thumbs' -Width 600
#>
param(
    [string]$InputDir = 'my photos',
    [string]$ThumbDir = 'thumbs',
    [int]$Width = 600
)

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host 'ImageMagick not found. Install ImageMagick and ensure `magick` is on PATH.' -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path $InputDir)) {
    Write-Host "Input folder '$InputDir' not found." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $ThumbDir)) { New-Item -ItemType Directory -Path $ThumbDir | Out-Null }

Get-ChildItem -Path $InputDir -File | ForEach-Object {
    $in = $_.FullName
    $outName = [IO.Path]::GetFileNameWithoutExtension($_.Name) + '.webp'
    $out = Join-Path $ThumbDir $outName
    magick $in -strip -quality 75 -resize ${Width}x $out
    Write-Host "Created: $out"
}

Write-Host 'Thumbnails generated.' -ForegroundColor Green
