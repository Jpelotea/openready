# OpenReady

OpenReady is a beginner-friendly, non-commercial open-source readiness checklist for maintainers who want to prepare a healthy public software project.

It helps project creators review the essentials before applying to open-source hosting programs or inviting contributors, including:

- open-source license
- Code of Conduct
- contributing guide
- changelog
- roadmap
- community links
- Netlify attribution
- non-commercial project statement

This project is intentionally simple: it runs fully in the browser as a static web app. No backend, no tracking, no account system, and no paid services are required.

## Project status

Early public version. Contributions, suggestions, and beginner-friendly documentation improvements are welcome.

## Live site

Add your Netlify site URL here after deployment:

```text
https://capable-chaja-458cb0.netlify.app/
```

## Repository structure

```text
openready/
├── public/                 # Static website and browser app
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/                   # Community-facing documentation
│   ├── getting-started.md
│   ├── maintainer-guide.md
│   ├── roadmap.md
│   └── netlify-open-source-readiness.md
├── .github/                # GitHub collaboration templates
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── netlify.toml
└── README.md
```

## Local use

Because OpenReady is a plain static app, you can open it directly in a browser:

1. Download or clone this repository.
2. Open `public/index.html` in a browser.
3. Check items and use the export button to save your checklist as JSON.

Optional local server:

```bash
cd public
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploying to Netlify

Recommended settings:

- Build command: leave blank
- Publish directory: `public`

The `netlify.toml` file already sets the publish directory.

## Non-commercial statement

OpenReady is a non-commercial open-source software project. It does not sell hosting, consulting, premium support, or paid access. The project exists to help maintainers prepare better public repositories and community documentation.

## License

Code is licensed under the MIT License. See [LICENSE](LICENSE).

Documentation is included in the repository for project use and contribution. Unless otherwise stated, documentation is also available under the MIT License.

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

## Contributing

Beginner-friendly contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).
