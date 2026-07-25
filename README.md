# OpenReady

OpenReady is a free, non-commercial open-source web application that helps maintainers assess and improve the public health of software repositories.

It turns repository best practices into a practical browser-based checklist covering:

- licensing
- project documentation
- contributor guidance
- Code of Conduct
- security policy
- governance
- changelog and roadmap
- community participation

OpenReady runs entirely in the browser. It has no backend, account system, analytics, or paid services.

## Live application

https://capable-chaja-458cb0.netlify.app/

## Current version

**v0.2.0 — Interface and reporting release**

Current capabilities:

- interactive repository-health checklist
- automatic progress score
- local browser saving with `localStorage`
- project notes
- JSON export
- JSON import
- print-friendly readiness report
- responsive mobile layout
- accessibility-minded controls and focus states

## Who it is for

OpenReady is designed for:

- first-time open-source maintainers
- small community software projects
- contributors helping improve repository documentation
- educators introducing healthy open-source practices
- project owners preparing a public release

## Privacy

OpenReady does not send checklist information to a server. Progress and notes remain in the current browser unless the user intentionally exports a JSON backup.

## Repository structure

```text
openready/
├── index.html
├── styles.css
├── app.js
├── getting-started.md
├── maintainer-guide.md
├── roadmap.md
├── netlify-open-source-readiness.md
├── .github/
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

## Run locally

No build process is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.

For a local development server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploying

OpenReady is a static site. Netlify can publish it directly from the repository root.

Recommended settings:

```text
Build command: leave blank
Publish directory: .
```

The included `netlify.toml` contains the publish configuration.

## Project roadmap

See [roadmap.md](roadmap.md) and the public [v0.1.0 roadmap tracker](https://github.com/Jpelotea/openready/issues/7).

Current open work includes:

- improving checklist guidance
- adding README screenshots
- refining mobile usability
- expanding accessibility checks
- exploring optional project profiles and scoring

## Contributing

Beginner-friendly contributions are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md), browse the [issue tracker](https://github.com/Jpelotea/openready/issues), or join [GitHub Discussions](https://github.com/Jpelotea/openready/discussions).

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please review [SECURITY.md](SECURITY.md) before reporting a sensitive issue.

## Non-commercial statement

OpenReady is a non-commercial open-source software project. It does not sell hosting, consulting, premium support, advertising, subscriptions, or paid access.

## License

OpenReady is licensed under the [MIT License](LICENSE).
