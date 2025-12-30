Quick steps to make the gallery load much faster for large photo sets

1) Generate optimized thumbnails (recommended)

```powershell
magick -version
.\generate_thumbs.ps1 -InputDir 'my photos' -ThumbDir 'thumbs' -Width 800
```

This creates `thumbs/*.webp` which are much smaller and should be used in the gallery instead of full-size images.

2) Replace image sources to point to the `thumbs/` folder for the gallery grid and keep full-size images for the modal.

3) Host the site over HTTP (simple local server) for service worker to work:

```powershell
# from the PHOTOS folder
python -m http.server 8000
# then open http://localhost:8000/gallery.html
```

4) For best worldwide performance, upload `gallery.html`, `thumbs/` and `my photos/` to a static host or CDN (Netlify, Cloudflare Pages, S3+CloudFront).

Deployment to Netlify / Vercel
--------------------------------

Quick checklist before deploying:
- Generate the `thumbs/` folder (recommended) so the grid loads tiny images first. Run `generate_thumbs.ps1` locally and commit the `thumbs/` folder, or include a CI step to generate them.
- Commit the entire site (all files and `thumbs/`) to a Git repo (GitHub, GitLab, Bitbucket) or prepare the static folder for drag-and-drop.

Netlify (recommended options):
- Option A (quick): Go to https://app.netlify.com/drop and drag-and-drop the project folder (ensure `index.html` is at the root).
- Option B (recommended for continuous deploy): Push to GitHub and connect the repo in Netlify. Set `Publish directory` to `.` and no build command for this static site.
- Netlify will serve files over HTTPS and apply the `netlify.toml` caching headers included in this repo.

Vercel (recommended options):
- Option A (quick): Run `vercel` from the project folder (requires Vercel CLI login) and follow prompts.
- Option B (recommended for continuous deploy): Push to GitHub and import the repo at https://vercel.com/import. Vercel will detect a static site; no build step required.
- The included `vercel.json` config sets the project as a static site.

Notes & tips:
- Service worker: will work once the site is served over HTTPS from these hosts.
- Large originals: consider not committing extremely large original files to Git. Instead, upload originals to the static host or use a separate object storage + keep optimized `thumbs/` and moderate-resolution gallery images in the repo.
- If you prefer CI-driven thumbnail generation, I can help add a GitHub Action to run `generate_thumbs.ps1` (or an ImageMagick step) on push and commit the generated thumbs.

Password protection options
---------------------------

1) Quick (client-side) — implemented here:
- The repo now includes `login.html` and `auth.js`. Edit `auth.js` and replace `PASSWORD_HASH` with the SHA-256 hex digest of your chosen password. When relatives enter that password, a cookie is set and they can access `gallery.html`.
- To compute the SHA-256 hash locally (Windows PowerShell), run:

```powershell
# PowerShell: compute SHA256 hex of the password string
[System.BitConverter]::ToString((New-Object System.Security.Cryptography.SHA256Managed).ComputeHash([System.Text.Encoding]::UTF8.GetBytes('mypassword'))).Replace('-','').ToLower()
```

2) Stronger (server-side):
- For robust security, use host-provided access controls or server-side checks (Netlify Access, Vercel Password Protect middleware, or a small serverless function that validates a secret and sets a secure cookie).
- If you want a server-side flow, I can add a Netlify Function or Vercel Edge middleware to validate a password stored as an environment variable (safer because the secret is kept out of the repo). Let me know which host (Netlify or Vercel) you prefer and I will add that workflow.

Security note:
- The client-side approach prevents casual visitors but is not cryptographically secure — anyone who can view repository files can attempt to brute-force or observe the hash. Use server-side protection for truly private galleries.

Daily workflow (Update photos everyday)
---------------------------------------

Once you've deployed to Netlify or Vercel:

1. Add new photos to the `my photos/` folder on your PC.
2. Open PowerShell in the `PHOTOS` folder and run:

```powershell
.\update-gallery.ps1
```

This script will:
- Scan the `my photos/` folder and find all new images.
- Regenerate thumbnails for all images.
- Update the images list in `app.js`.
- Commit and push to GitHub automatically.

3. GitHub Actions will run and redeploy your site automatically — no manual action needed.
4. Your relatives will see the new photos within 1-2 minutes.

That's it! Just drop photos in, run the script, and you're done.