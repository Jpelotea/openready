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

https://getopenready.netlify.app/

## Current version

**v0.2.1 — Data, theming, and maintenance foundation**

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
- responsive mobile, tablet, desktop, laptop-height, and ultra-wide layouts
- accessibility-minded controls, focus states, and reduced-motion support
- native browser reveal animations
- lightweight SVG repository-network hero artwork
- height-aware hero composition that keeps the main call to action and preview usable on short laptop screens
- automated JSON validation
- Playwright browser, keyboard, viewport, reduced-motion, and hero-layout regression checks
- repeatable local and production Lighthouse audits with downloadable reports

## Interface and visual design

The hero uses a decorative repository-network sphere implemented as a standalone SVG rather than WebGL or a third-party animation framework.

Design safeguards include:

- `pointer-events: none` so the artwork never blocks controls
- reduced or removed artwork at smaller breakpoints
- no decorative motion when `prefers-reduced-motion: reduce` is active
- separate light- and dark-theme opacity tuning
- height-aware desktop rules for common laptop displays
- regression coverage that verifies the primary call to action and full project-health preview stay above the fold at `1600 × 860`

The dark-theme accent palette is intentionally muted to reduce glare while retaining readable interactive states.

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
- [Automated browser testing](docs/automated-browser-testing.md)
- [Performance and accessibility audits](docs/performance.md)
- [Production deployment audit](docs/production-audit.md)
- [Manual accessibility and device testing](docs/manual-accessibility-testing.md)

Beginner-friendly bug reports, documentation improvements, accessibility feedback, design suggestions, and focused code contributions are welcome.

## Privacy

OpenReady does not send checklist information to a server. Progress and notes remain in the current browser unless the user intentionally exports a JSON backup.

## Repository structure

```text
openready/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   │   ├── browser-accessibility.yml
│   │   ├── lighthouse-production.yml
│   │   ├── lighthouse.yml
│   │   └── validate-data.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── data/
│   ├── checklist.json
│   └── site.json
├── docs/
│   ├── automated-browser-testing.md
│   ├── manual-accessibility-testing.md
│   ├── performance.md
│   └── production-audit.md
├── scripts/
│   └── validate_data.py
├── tests/
│   └── browser-accessibility.spec.js
├── index.html
├── styles.css
├── docs-grid.css
├── app.js
├── hero-orbit.svg
├── favicon.svg
├── playwright.config.js
├── lighthouserc.json
├── lighthouserc.production.json
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

No package installation or build process is required for normal use.

## Editing content and themes

Frequently updated content is separated from the core application logic:

- edit `data/checklist.json` to change checklist items, categories, explanations, and resource links
- edit `data/site.json` to change project links, documentation cards, roadmap entries, and theme colors
- edit `hero-orbit.svg` and the hero rules in `docs-grid.css` only when changing the decorative hero composition

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

## Automated browser testing

OpenReady uses Playwright and Chromium to check keyboard interaction, theme persistence, JSON import, reduced motion, viewport overflow, and key responsive layouts.

The suite also includes a short-laptop regression check at `1600 × 860` that verifies:

- the **Start the checklist** action remains within the initial viewport
- the complete project-health preview remains within the initial viewport
- the headline does not create an isolated final word
- no horizontal overflow is introduced

See [docs/automated-browser-testing.md](docs/automated-browser-testing.md).

## Lighthouse quality audits

OpenReady uses Lighthouse CI to measure Performance, Accessibility, Best Practices, and SEO in repeatable GitHub Actions environments.

Run the local-static-build audit from the repository root:

```bash
npx --yes @lhci/cli@0.15.x autorun
```

The first recorded post-fix local baseline used three runs in GitHub Actions. All three runs scored 100 in all four categories. These scores apply only to that controlled local-static-build environment.

The last recorded post-deployment production baseline used three runs:

| Run | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| 1 | 88 | 100 | 100 | 100 |
| 2 | 100 | 100 | 100 | 100 |
| 3 | 100 | 100 | 100 | 100 |

Production performance can vary between cold and warm runs. The repository has changed since this baseline, so future claims should use a newly generated audit rather than treating these measurements as permanent.

See [docs/performance.md](docs/performance.md) for the local baseline, [docs/production-audit.md](docs/production-audit.md) for deployed-site evidence, and [docs/manual-accessibility-testing.md](docs/manual-accessibility-testing.md) for checks Lighthouse cannot complete.

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

- completing keyboard, screen-reader, zoom, reflow, and real-device testing
- adding README screenshots
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
