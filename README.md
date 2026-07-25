# OpenReady

OpenReady is a free, non-commercial open-source web application that helps maintainers assess and improve the public health of software repositories.

It turns repository best practices into a practical browser-based checklist covering:

- licensing
- project documentation
- contributor guidance
- Code of Conduct
- security policy
- governance and maintainer roles
- changelog and release history
- roadmap and planned improvements
- community participation

OpenReady runs entirely in the browser. It has no backend, account system, analytics, or paid services.

## Live application

https://capable-chaja-458cb0.netlify.app/

## Current version

**v0.2.1 — Data and theming foundation**

Current capabilities:

- interactive repository-health checklist
- automatic progress score
- local browser saving with `localStorage`
- project notes
- JSON export and import
- print-friendly readiness report
- JSON-driven checklist and site content
- adaptive light and dark themes
- configurable semantic color tokens
- responsive mobile, tablet, desktop, and ultra-wide layouts
- accessibility-minded controls, focus states, and reduced-motion support
- native browser reveal animations

## Who it is for

OpenReady is designed for:

- first-time open-source maintainers
- small community software projects
- contributors helping improve repository documentation
- educators introducing healthy open-source practices
- project owners preparing a public release

## Community and project health

OpenReady provides public links and documentation directly related to the software:

- [Issue tracker](https://github.com/Jpelotea/openready/issues)
- [GitHub Discussions](https://github.com/Jpelotea/openready/discussions)
- [Contributing guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Governance and maintainer roles](GOVERNANCE.md)
- [Security policy](SECURITY.md)
- [Release history](CHANGELOG.md)
- [Project roadmap](roadmap.md)

Beginner-friendly bug reports, documentation improvements, accessibility feedback, design suggestions, and focused code contributions are welcome.

## Privacy

OpenReady does not send checklist information to a server. Progress and notes remain in the current browser unless the user intentionally exports a JSON backup.

## Repository structure

```text
openready/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   │   └── validate-data.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── data/
│   ├── checklist.json
│   └── site.json
├── scripts/
│   └── validate_data.py
├── index.html
├── styles.css
├── app.js
├── getting-started.md
├── maintainer-guide.md
├── roadmap.md
├── netlify-open-source-readiness.md
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

OpenReady loads JSON content with `fetch`, so it must be served through a local web server.

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No package installation or build process is required.

## Editing content and themes

Frequently updated content is separated from the core application logic:

- edit `data/checklist.json` to change checklist items, categories, explanations, and resource links
- edit `data/site.json` to change project links, documentation cards, roadmap entries, and theme colors

Keep checklist IDs stable so existing browser progress and imported files remain compatible.

## Automated data validation

Every push or pull request that changes the JSON data, validation script, or workflow runs:

```bash
python scripts/validate_data.py
```

The validator checks:

- valid JSON syntax
- required checklist fields
- unique, stable checklist IDs
- complete documentation and community links
- valid HTTP or HTTPS URLs
- required light and dark theme tokens
- roadmap entry structure

The workflow is defined in `.github/workflows/validate-data.yml`.

## Deploying

OpenReady is a static site. Netlify can publish it directly from the repository root.

Recommended settings:

```text
Build command: leave blank
Publish directory: .
```

The included `netlify.toml` contains the publish configuration and static-site headers.

## Project roadmap

See [roadmap.md](roadmap.md) and the public [v0.3.0 roadmap tracker](https://github.com/Jpelotea/openready/issues/8).

Current open work includes:

- adding a repeatable Lighthouse performance baseline
- adding README screenshots
- expanding accessibility checks
- exploring optional project profiles and scoring
- developing beginner-friendly project-material helpers

## Decision-making

Current decision-making, review criteria, maintainer responsibilities, and future governance plans are documented in [GOVERNANCE.md](GOVERNANCE.md).

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
