# Maintainer Guide

This guide explains the basic maintenance workflow for OpenReady.

## Project purpose

OpenReady is a non-commercial open-source browser application for assessing the public health of software repositories.

The project should remain:

- free to use
- openly licensed
- privacy-conscious
- beginner-friendly
- accessible
- focused on repository health and community readiness

## Main editable files

### `data/checklist.json`

Contains the assessment structure:

- stable item IDs
- core-readiness or operational-maturity levels
- categories
- titles
- descriptions
- optional resource links

Avoid changing an existing item ID without a migration plan because saved browser progress and exported JSON files use these IDs.

### Guidance data

- `data/guidance-core.json` contains guidance for core-readiness items.
- `data/guidance-maturity.json` contains guidance for operational-maturity items.
- `data/materials.json` contains editable Markdown starters and safety notices.

Every checklist item must have complete guidance. Referenced starter IDs must exist and remain aligned with the validator.

### `data/site.json`

Contains reusable site configuration:

- application version
- repository and community links
- product principles
- feature cards
- documentation cards
- roadmap entries
- light and dark theme tokens

### Application files

- `app.js` handles base JSON loading, rendering, theme behavior, and site content.
- `assessment.js` handles assessment state, scoring, migration, import, export, and print preparation.
- `profile.js` handles the optional project profile and loads guided materials.
- `guidance.js` renders guidance, safety notices, and editable starters.
- `styles.css`, `assessment.css`, `guidance.css`, and `docs-grid.css` contain responsive, theme, accessibility, and print styling.
- `index.html` contains semantic page structure, search metadata, accessibility landmarks, fallback content, and the required Netlify attribution.

### Community documents

- `COMMUNITY.md` defines first-contribution pathways, label rules, contribution types, and recognition.
- `METRICS.md` defines privacy-respecting project measurements and interpretation rules.
- `docs/metrics-snapshot-template.md` provides a reproducible review format.
- `CONTRIBUTING.md`, `SUPPORT.md`, and `GOVERNANCE.md` define contribution, capacity, and decision expectations.

## Local testing

Because OpenReady loads JSON files with `fetch`, run a local static server:

```bash
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Do not rely only on opening `index.html` directly with a `file://` URL.

## Validation

Run:

```bash
python scripts/validate_data.py
python scripts/validate_guidance.py
```

Use the browser and Lighthouse workflows when the affected paths trigger them. Do not describe a workflow as passing until its result has been verified.

## Release checklist

Before publishing a release:

1. Update the application version in `data/site.json`.
2. Update the software version in the structured data inside `index.html`.
3. Update `CHANGELOG.md`.
4. Update `RELEASES.md` with the correct date, purpose, highlights, compatibility notes, and evidence.
5. Recognize relevant documentation, accessibility, testing, issue-reporting, design, code, and community contributions accurately.
6. Respect contributor requests not to be named and do not imply employment, payment, endorsement, or maintainer status.
7. Update `roadmap.md`.
8. Confirm all JSON data is valid.
9. Test JSON export and import, including legacy migration when relevant.
10. Test printing or saving a report as PDF.
11. Test light, dark, and system theme behavior.
12. Check keyboard navigation and visible focus states.
13. Check mobile, tablet, desktop, short-laptop, and wide layouts.
14. Confirm reduced-motion preferences are respected.
15. Confirm the Netlify attribution remains visible.
16. Confirm all community, policy, metrics, and documentation links work.
17. Confirm no analytics, tracking, funding, paid service, commercial, or monetization feature was introduced.

## Issue labels

### `good first issue`

Apply only when the task:

- has one small outcome
- identifies the affected files or interface area
- includes clear acceptance criteria and verification
- requires no confidential information or repository permissions
- can normally be completed without prior OpenReady knowledge

Do not use the label to make a broad or specialist task appear beginner-friendly.

### `help wanted`

Apply when a scoped task would benefit from community participation but may require specific experience, assistive technology, hardware, or deeper project knowledge.

The label does not promise immediate review, assignment, acceptance, or a release date. Remove or revise it when the task is no longer actionable.

## Triage and contributor experience

During issue review:

- welcome focused reports and ask for missing reproduction details
- narrow large proposals before inviting implementation
- distinguish confidential security or conduct routes from public support
- explain deferral and closure decisions respectfully
- avoid assigning work without contributor agreement
- avoid leaving a task labeled for newcomers when its scope has grown
- point first-time contributors to [COMMUNITY.md](COMMUNITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md)

Contribution is broader than code. Release notes and project updates may recognize documentation, accessibility, testing, issue reporting, design, code, and community support.

## Project metrics review

Use [METRICS.md](METRICS.md) and [`docs/metrics-snapshot-template.md`](docs/metrics-snapshot-template.md) when a monthly, release, or project-health review would support a decision.

A snapshot should:

- identify the reporting period and time zone
- use reproducible GitHub queries or linked evidence
- state exclusions and missing data
- protect private security, conduct, accessibility, and personal information
- explain the decision supported by each measurement
- avoid activity quotas or comparisons that shame contributors or maintainers

A missing monthly snapshot is not a project failure. Stars and views are optional awareness indicators, not health scores. Funding and commercial metrics are outside scope.

## Theme review

When changing theme tokens:

- maintain readable text contrast
- review primary buttons and links
- review success and error colors
- review focus indicators
- review assessment cards and guided materials
- review the dark roadmap section
- test both default and custom color combinations

## Performance goals

The project aims for strong Lighthouse results while keeping the application lightweight and dependency-free.

Prefer:

- semantic HTML
- native browser APIs
- small static assets
- minimal JavaScript
- no unnecessary third-party services
- no embedded analytics or tracking scripts
- short cache lifetimes for editable JSON content
- measured improvements rather than unsupported performance claims

## Community maintenance

Use GitHub Issues for focused work and GitHub Discussions for broader questions and ideas. Keep roadmap issues current and close completed work with a clear release reference.

OpenReady is maintained on a best-effort basis. Response measurements are used to improve documentation or triage, not to create an SLA or require constant availability.

## Things to avoid

Do not add:

- paid support offers
- donation or sponsorship promotion
- affiliate links
- commercial hosting services
- unnecessary tracking scripts
- contributor activity quotas
- maintainer productivity targets
- heavy frameworks without a clear project need
- custom themes that make text or controls difficult to read