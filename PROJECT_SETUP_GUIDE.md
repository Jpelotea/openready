# Step-by-step setup guide for OpenReady

Use this guide after downloading the starter repository.

## 1. Rename the project if needed

You can keep the name `OpenReady`, or rename it to something personal like:

- `oss-ready-checklist`
- `open-project-starter`
- `community-readiness-kit`

If you rename it, update the project name in:

- `README.md`
- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

## 2. Create a public GitHub repository

1. Go to GitHub.
2. Click **New repository**.
3. Name it `openready` or your chosen name.
4. Set visibility to **Public**.
5. Do not add another README, license, or gitignore because this starter already includes them.
6. Create the repository.

## 3. Upload the files

Beginner option:

1. Open your new GitHub repository.
2. Click **Add file**.
3. Click **Upload files**.
4. Upload all files and folders from this starter project.
5. Commit the upload.

Developer option:

```bash
git init
git add .
git commit -m "Initial open-source project setup"
git branch -M main
git remote add origin https://github.com/Jpelotea/openready.git
git push -u origin main
```

## 4. Update placeholders

Before applying for any open-source hosting plan, update these placeholders:

- GitHub repository links in `public/index.html`
- maintainer contact in `CODE_OF_CONDUCT.md`
- maintainer contact in `SECURITY.md`
- live site URL in `README.md`
- copyright holder in `LICENSE`, if needed

## 5. Deploy to Netlify

1. Log in to Netlify.
2. Add a new project from Git.
3. Connect your public GitHub repository.
4. Use these settings:
   - Build command: leave blank
   - Publish directory: `public`
5. Deploy the site.

The `netlify.toml` file already sets the publish directory.

## 6. Final review before applying to Netlify Open Source plan

Make sure the project has:

- public repository
- software code in `public/app.js`
- `LICENSE`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- community-facing documentation in `docs/`
- visible Netlify link in the footer
- no commercial offers, pricing, paid support, or hosting services

## 7. Suggested application description

```text
OpenReady is a non-commercial open-source software project that helps maintainers prepare healthier public repositories. It provides a browser-based readiness checklist and community-facing documentation for licensing, Code of Conduct, contributing guides, changelogs, roadmaps, and open collaboration.

The repository is public, licensed under the MIT License, and includes a top-level Code of Conduct. The website contains documentation and project information directly related to the OpenReady software and community. The site footer includes the required Netlify attribution: “This site is powered by Netlify.”
```
