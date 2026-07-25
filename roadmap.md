# OpenReady Roadmap

OpenReady is developed through small, public releases focused on practical value for maintainers.

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

## Current — v0.2.1

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

## Planned — v0.3.0

Guided project setup:

- optional project profile fields
- expanded explanations and examples for every checklist item
- README section helper
- dedicated accessibility review checklist
- optional readiness categories and scoring details
- validation guidance for custom themes and JSON content

Track this release in [issue #8](https://github.com/Jpelotea/openready/issues/8).

## Performance and quality work

Completed foundation:

- repeatable local-static-build Lighthouse audit process
- public Netlify deployment audit workflow
- documented Performance, Accessibility, Best Practices, and SEO baselines
- automatic HTML and JSON report artifacts
- accessibility fixes informed by the first local audit
- production evidence showing the current deployment gap
- manual keyboard, screen-reader, zoom, reflow, theme, motion, and device test plan

Next quality improvements:

- deploy the latest `main` branch to the public site through [issue #13](https://github.com/Jpelotea/openready/issues/13)
- rerun the production audit after deployment
- complete human accessibility and device testing through [issue #14](https://github.com/Jpelotea/openready/issues/14)
- review production layout stability, render-blocking work, and main-thread activity
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
