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

## Planned — v0.4.0

Guided project materials and deeper review support:

- expanded explanations and examples for every checklist item
- README section helper
- dedicated accessibility review checklist
- optional readiness categories and scoring details
- improved documentation for custom checklist imports and exports
- validation guidance for custom themes and JSON content

Track the next release in [issue #23](https://github.com/Jpelotea/openready/issues/23).

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

- rerun the production audit for v0.3.0
- complete human accessibility and device testing through [issue #14](https://github.com/Jpelotea/openready/issues/14)
- complete browser zoom, reflow, and high-contrast review through [issue #19](https://github.com/Jpelotea/openready/issues/19)
- complete representative real-device testing through [issue #20](https://github.com/Jpelotea/openready/issues/20)
- add automated link checks for community and documentation resources
- expand validation as the data schema grows

## Future exploration

Ideas that require further design and community feedback:

- optional GitHub repository URL assessment
- reusable community-document templates
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
4. community contributions that fit the non-commercial project mission
5. measurable improvements to maintainability and performance

See the [issue tracker](https://github.com/Jpelotea/openready/issues) for current work.
