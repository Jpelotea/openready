# OpenReady

OpenReady is a free, non-commercial open-source web application that helps maintainers assess and improve the public health of software repositories.

It turns repository best practices into a practical browser-based assessment covering:

- licensing
- project documentation
- contributor guidance
- accessibility
- Code of Conduct
- security policy and incident readiness
- governance and maintainer roles
- support boundaries
- changelog and release history
- roadmap and planned improvements
- community participation
- privacy-respecting project metrics

OpenReady runs entirely in the browser. It has no backend, account system, analytics, tracking, or paid services.

## Live application

https://getopenready.netlify.app/

## Interface preview

![OpenReady v0.3.0 checklist interface showing an optional project profile, a 40% readiness score, and completed repository-health items](docs/images/openready-interface-v0.3.0.png)

*The OpenReady v0.3.0 workspace identifies the project being reviewed, tracks repository-health progress, and keeps checklist data in the current browser.*

## Current version

**v0.3.0 — Project profiles and identified reports**

Current release capabilities are documented in [RELEASES.md](RELEASES.md). Work merged for the planned v0.4.0 release remains unreleased until the complete release gate is finished.

## Release documentation

Every shipped version is recorded in both:

- [RELEASES.md](RELEASES.md) — readable release summaries, dates, purpose, highlights, and compatibility notes
- [CHANGELOG.md](CHANGELOG.md) — detailed added, changed, accessibility, security, community, and quality entries

The current and planned release sequence is documented in [roadmap.md](roadmap.md).

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
- [Community participation pathways](COMMUNITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [Project health metrics](METRICS.md)
- [Accessibility commitment and reporting](ACCESSIBILITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Governance and maintainer roles](GOVERNANCE.md)
- [Support boundaries](SUPPORT.md)
- [Security policy](SECURITY.md)
- [Threat model](THREAT_MODEL.md)
- [Incident response](INCIDENT_RESPONSE.md)
- [Release summaries](RELEASES.md)
- [Detailed changelog](CHANGELOG.md)
- [Project roadmap](roadmap.md)
- [Automated browser testing](docs/automated-browser-testing.md)
- [Performance and accessibility audits](docs/performance.md)
- [Production deployment audit](docs/production-audit.md)
- [Manual accessibility and device testing](docs/manual-accessibility-testing.md)

Beginner-friendly bug reports, documentation improvements, accessibility feedback, design suggestions, test evidence, community support, and focused code contributions are welcome.

Browse [`good first issue`](https://github.com/Jpelotea/openready/labels/good%20first%20issue) for small documented tasks and [`help wanted`](https://github.com/Jpelotea/openready/labels/help%20wanted) for scoped work where community experience or equipment would help. Label definitions and recognition rules are documented in [COMMUNITY.md](COMMUNITY.md).

## Privacy

OpenReady does not send project-profile, assessment, notes, evidence, review, or guided-material draft data to a server. Values remain in the current browser unless the user intentionally exports a JSON backup, downloads a Markdown starter, copies content, or prints a report.

Avoid entering confidential, medical, account, or other sensitive personal information, especially on a shared device. Exported JSON, downloaded Markdown, clipboard content, and printed reports may contain information selected by the user.

Project-health measurement uses aggregate GitHub repository activity and project-controlled records. OpenReady does not install website analytics, tracking pixels, session recording, fingerprinting, or advertising measurement. See [METRICS.md](METRICS.md).

## Repository structure

```text
openready/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── accessibility.yml
│   └── workflows/
│       ├── browser-accessibility.yml
│       ├── lighthouse-production.yml
│       ├── lighthouse.yml
│       └── validate-data.yml
├── data/
│   ├── checklist.json
│   ├── guidance-core.json
│   ├── guidance-maturity.json
│   ├── materials.json
│   └── site.json
├── docs/
│   ├── images/
│   │   └── openready-interface-v0.3.0.png
│   ├── assessment-schema-v2.md
│   ├── automated-browser-testing.md
│   ├── guided-project-materials.md
│   ├── manual-accessibility-testing.md
│   ├── metrics-snapshot-template.md
│   ├── performance.md
│   └── production-audit.md
├── scripts/
│   ├── validate_data.py
│   └── validate_guidance.py
├── tests/
│   ├── browser-accessibility.spec.js
│   └── guided-materials.spec.js
├── index.html
├── styles.css
├── docs-grid.css
├── assessment.css
├── guidance.css
├── app.js
├── assessment.js
├── profile.js
├── guidance.js
├── hero-orbit.svg
├── favicon.svg
├── playwright.config.js
├── lighthouserc.json
├── lighthouserc.production.json
├── getting-started.md
├── maintainer-guide.md
├── roadmap.md
├── RELEASES.md
├── netlify-open-source-readiness.md
├── ACCESSIBILITY.md
├── CODE_OF_CONDUCT.md
├── COMMUNITY.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── INCIDENT_RESPONSE.md
├── METRICS.md
├── PULL_REQUEST_TEMPLATE.md
├── SECURITY.md
├── SUPPORT.md
├── THREAT_MODEL.md
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

## Assessment workspace

The optional project profile can include:

- project name
- repository URL
- maintainer or team
- target release or review date

The assessment supports core-readiness and operational-maturity levels, four statuses, evidence links, notes, review dates, and responsible people or teams. Values are stored locally and included in intentional JSON export and print reports.

See [docs/assessment-schema-v2.md](docs/assessment-schema-v2.md) for the planned v0.4.0 data model, scoring, migration, preservation, reset, and print behavior.

## Guided project materials

Every assessment item has structured guidance explaining why it matters, minimum and stronger implementations, common mistakes, example evidence, and further resources.

Ten editable Markdown starters cover README planning, accessibility, security, threat modeling, incident response, governance, support, conduct enforcement, metrics, and license review. Starter edits are not scored, saved automatically, or included in assessment JSON.

See [docs/guided-project-materials.md](docs/guided-project-materials.md).

## Editing content and themes

Frequently updated content is separated from core application logic:

- edit `data/checklist.json` to change assessment items, levels, categories, explanations, and resource links
- edit `data/guidance-core.json` and `data/guidance-maturity.json` to change structured guidance
- edit `data/materials.json` to change safety notices and editable starters
- edit `data/site.json` to change project links, documentation cards, roadmap entries, version information, and theme colors
- edit `profile.js`, `assessment.js`, or `guidance.js` only when changing their related behavior
- edit `hero-orbit.svg` and hero rules in `docs-grid.css` only when changing the decorative hero composition

Keep assessment IDs stable so existing browser progress and imported files remain compatible.

## Automated data validation

Run:

```bash
python scripts/validate_data.py
python scripts/validate_guidance.py
```

Validation covers:

- valid JSON syntax
- schema versions, levels, statuses, and required assessment fields
- unique, stable assessment IDs
- complete guidance for every assessment item
- starter references, filenames, notices, and required starter inventory
- complete documentation and community links
- valid HTTP or HTTPS resource URLs
- required light and dark theme tokens
- roadmap entry structure
- safeguards against funding and commercial assessment content

The workflow is defined in `.github/workflows/validate-data.yml`.

## Automated browser testing

OpenReady uses Playwright and Chromium to check:

- keyboard interaction
- theme persistence
- project-profile persistence
- schema-v2 import, export, migration, and reset behavior
- four-state assessment controls and scoring
- guided content coverage and starter actions
- reduced motion
- viewport overflow
- key responsive and print layouts

The suite also includes a short-laptop regression check at `1600 × 860` that verifies the primary action and preview remain within the initial viewport without horizontal overflow.

See [docs/automated-browser-testing.md](docs/automated-browser-testing.md).

## Lighthouse quality audits

OpenReady uses Lighthouse CI to measure Performance, Accessibility, Best Practices, and SEO in repeatable GitHub Actions environments.

The last recorded v0.3.0 production baseline used three runs:

| Run | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| 1 | 88 | 100 | 100 | 100 |
| 2 | 100 | 100 | 100 | 100 |
| 3 | 100 | 100 | 100 | 100 |

The repository has changed since this baseline. These historical measurements must not be presented as current v0.4.0 results. A fresh production audit is required before release.

See [docs/performance.md](docs/performance.md), [docs/production-audit.md](docs/production-audit.md), and [docs/manual-accessibility-testing.md](docs/manual-accessibility-testing.md).

## Accessibility

OpenReady's accessibility goals, current verification status, known manual-testing gaps, and reporting process are documented in [ACCESSIBILITY.md](ACCESSIBILITY.md).

Automated scores and tests are useful evidence, but they do not establish full conformance or replace testing with people and assistive technologies.

## Security and incident readiness

Review [SECURITY.md](SECURITY.md) before reporting a sensitive issue. OpenReady's current assets, trust boundaries, threats, and mitigations are documented in [THREAT_MODEL.md](THREAT_MODEL.md). The response process for a suspected security incident is documented in [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md).

Do not publish exploit details or credentials in a public issue.

## Support

OpenReady is maintained on a best-effort basis. Supported request types, public channels, response targets, out-of-scope requests, maintainer breaks, and non-commercial support boundaries are documented in [SUPPORT.md](SUPPORT.md).

## Project metrics

[METRICS.md](METRICS.md) defines reproducible measurements for issue load, pull requests, first-time and returning contributors, contribution types, acknowledgement time, accessibility work, releases, roadmap outcomes, and workflow health.

Metrics support project decisions rather than vanity targets. Stars and views are optional awareness indicators, not proof of quality, accessibility, security, sustainability, or Netlify eligibility. Missing monthly snapshots are not failures, and response measurements are not an SLA.

## Deploying

OpenReady is a static site. Netlify can publish it directly from the repository root.

Recommended settings:

```text
Build command: leave blank
Publish directory: .
```

The included `netlify.toml` contains the publish configuration and static-site headers.

## Project roadmap

The current release is documented in [RELEASES.md](RELEASES.md). Planned v0.4.0 work is tracked in [issue #23](https://github.com/Jpelotea/openready/issues/23) and [roadmap.md](roadmap.md).

Remaining release work includes:

- consolidating automated validation and browser coverage under Issue #31
- completing desktop and mobile screen-reader review
- completing browser zoom, reflow, high-contrast, and real-device testing
- updating release documentation and recording a fresh production audit
- completing an evidence-based Netlify application-readiness review after release

## Decision-making

Current decision-making, review criteria, maintainer responsibilities, role progression, succession, and conflict procedures are documented in [GOVERNANCE.md](GOVERNANCE.md).

## Contributing

Beginner-friendly contributions are welcome.

Read [COMMUNITY.md](COMMUNITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md), browse the [issue tracker](https://github.com/Jpelotea/openready/issues), or join [GitHub Discussions](https://github.com/Jpelotea/openready/discussions).

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md). Support and maintainer-capacity expectations are documented in [SUPPORT.md](SUPPORT.md).

## Non-commercial statement

OpenReady is a non-commercial open-source software project. It does not accept or promote donations, sponsorships, crowdfunding, advertising, affiliate links, paid support, consulting, implementation, hosting services, subscriptions, premium features, or paid access.

All project-controlled website content remains directly connected to the OpenReady software and its open-source community.

## License

OpenReady is licensed under the [MIT License](LICENSE).