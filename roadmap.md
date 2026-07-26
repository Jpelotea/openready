# OpenReady Roadmap

OpenReady is developed through small, public releases focused on practical value for maintainers.

Every shipped version is summarized in [RELEASES.md](RELEASES.md) and detailed in [CHANGELOG.md](CHANGELOG.md).

## Released — v0.1.0

Foundation release:

- browser-based repository-health checklist
- local progress saving
- project notes
- JSON export
- core project documentation
- MIT License
- Code of Conduct
- contributing and security guidance

## Released — v0.2.0

Interface and reporting release:

- redesigned responsive interface
- clearer software and community positioning
- JSON checklist import
- print-friendly readiness report
- improved focus states and mobile controls
- updated repository documentation

## Released — v0.2.1

Data, theming, and maintenance foundation:

- JSON-driven checklist and site content
- centralized project links and release information
- system-aware light and dark modes
- saved manual theme preference
- configurable semantic color tokens
- native browser reveal animations
- reduced-motion safeguards
- improved SEO metadata and structured data
- responsive support through ultra-wide displays
- visible governance and maintainer documentation
- automated JSON validation for pushes and pull requests
- repeatable local and production Lighthouse CI audits with downloadable reports
- documented local-static-build and public-deployment quality baselines
- a documented manual accessibility and real-device testing process

## Current — v0.3.0

Project profiles and identified reports:

- optional project name, repository URL, maintainer or team, and review-date fields
- local browser persistence for profile values
- project identity in JSON exports and imports
- project identity in print and PDF reports
- project-based JSON filenames
- reset behavior covering profile, checklist progress, and notes
- complete release summaries for every shipped version
- a lightweight SVG repository-network hero background
- refined light and dark theme presentation
- height-aware desktop hero layout for short laptop screens
- automated project-profile and hero regression coverage
- updated public URL and production metadata

The v0.3.0 release scope is tracked in [issue #8](https://github.com/Jpelotea/openready/issues/8) and the focused project-profile work in [issue #22](https://github.com/Jpelotea/openready/issues/22).

## In development — v0.4.0

**Guided Project Health Framework**

The release will extend OpenReady from a binary file-presence checklist into a backward-compatible assessment of core repository readiness and deeper operational maturity.

### Project policy foundation

Tracked in [issue #26](https://github.com/Jpelotea/openready/issues/26):

- accessibility commitment and reporting
- support scope and maintainer boundaries
- expanded security reporting and disclosure
- lightweight threat model
- incident-response procedure
- structured accessibility issue reporting

### Governance and conduct operations

Tracked in [issue #27](https://github.com/Jpelotea/openready/issues/27):

- contributor and maintainer role definitions
- permission and decision criteria
- consensus and disagreement handling
- conflict-of-interest procedures
- temporary absence, inactivity, succession, and project-transfer guidance
- conflict-safe Code of Conduct reporting and enforcement

### Checklist schema v2

Tracked in [issue #28](https://github.com/Jpelotea/openready/issues/28):

- core-readiness and operational-maturity levels
- complete, in-progress, not-started, and not-applicable states
- optional evidence, notes, review dates, and responsibility fields
- separate core, maturity, and overall scores
- backward-compatible import migration for v0.1-v0.3 exports
- clear non-certification explanations

### Guided project materials

Tracked in [issue #29](https://github.com/Jpelotea/openready/issues/29):

- expanded explanations and examples for every checklist item
- README planning guidance
- accessibility, security, threat-model, incident-response, governance, support, conduct, metrics, and license-review guidance
- legal, security, accessibility, and hosting-program disclaimers

### Community, quality, and release work

- contributor pathways and privacy-respecting metrics: [issue #30](https://github.com/Jpelotea/openready/issues/30)
- automated validation and browser coverage: [issue #31](https://github.com/Jpelotea/openready/issues/31)
- manual accessibility and real-device verification: [issue #32](https://github.com/Jpelotea/openready/issues/32)
- production audit, documentation, and release: [issue #33](https://github.com/Jpelotea/openready/issues/33)
- post-release Netlify application-readiness review: [issue #34](https://github.com/Jpelotea/openready/issues/34)

The complete release plan and safeguards are tracked in [issue #23](https://github.com/Jpelotea/openready/issues/23).

### Explicitly outside v0.4.0 scope

OpenReady will not add:

- funding, donation, sponsorship, crowdfunding, or GitHub Sponsors features
- pricing, subscriptions, premium features, or paid access
- paid support, consulting, implementation, or hosting services
- advertising, affiliate links, or commercial promotions
- funding or monetization checklist items
- formal legal, accessibility, security, or hosting-program certification
- accounts, a backend database, or cloud-saved checklist workspaces

OpenReady remains free, non-commercial, MIT licensed, private by default, and focused on its software and open-source community. These safeguards reduce avoidable Netlify eligibility concerns but do not guarantee approval.

## Performance and quality work

Completed foundation:

- repeatable local-static-build Lighthouse audit process
- public Netlify deployment audit workflow
- documented Performance, Accessibility, Best Practices, and SEO baselines
- automatic HTML and JSON report artifacts
- accessibility fixes informed by the first local audit
- production deployment evidence after the corrected `main` branch was published
- manual keyboard, screen-reader, zoom, reflow, theme, motion, and device test plan
- browser automation for project-profile persistence and JSON round-tripping
- short-laptop hero regression coverage

Next quality improvements:

- complete human accessibility and device testing through [issue #32](https://github.com/Jpelotea/openready/issues/32)
- complete desktop screen-reader review through [issue #17](https://github.com/Jpelotea/openready/issues/17)
- complete mobile screen-reader review through [issue #18](https://github.com/Jpelotea/openready/issues/18)
- complete browser zoom, reflow, and high-contrast review through [issue #19](https://github.com/Jpelotea/openready/issues/19)
- complete representative real-device testing through [issue #20](https://github.com/Jpelotea/openready/issues/20)
- add automated link checks for community and documentation resources
- expand validation and browser tests for schema v2
- run a fresh production audit after the v0.4.0 release candidate is deployed

## Future exploration

Ideas that require further design and community feedback:

- optional GitHub repository URL assessment
- reusable community-document templates beyond the v0.4.0 guided materials
- multilingual documentation
- project examples gallery
- maintainer learning pathway
- offline installable web app support
- JSON Schema files for editor integration

## How priorities are selected

Priorities are shaped by:

1. usability problems reported through GitHub Issues
2. accessibility and security needs
3. beginner-maintainer feedback
4. community contributions that fit the free, non-commercial project mission
5. measurable improvements to maintainability and performance
6. backward compatibility and user-data privacy

See the [issue tracker](https://github.com/Jpelotea/openready/issues) for current work.