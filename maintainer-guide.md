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

Contains the interactive checklist content:

- stable item IDs
- categories
- titles
- descriptions
- optional resource links

Avoid changing an existing item ID without a migration plan because saved browser progress and exported JSON files use these IDs.

### `data/site.json`

Contains reusable site configuration:

- application version
- repository and community links
- product principles
- feature cards
- documentation cards
- roadmap entries
- light and dark theme tokens

### `app.js`

Contains application behavior:

- JSON loading and rendering
- local browser storage
- progress calculation
- JSON import and export
- print reporting
- theme switching
- native reveal animations

### `styles.css`

Contains the responsive design system, semantic tokens, theme styling, print layout, and motion safeguards.

### `index.html`

Contains semantic page structure, search metadata, accessibility landmarks, fallback content, and the required Netlify attribution.

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

## Release checklist

Before publishing a release:

1. Update the application version in `data/site.json`.
2. Update the software version in the structured data inside `index.html`.
3. Update `CHANGELOG.md`.
4. Update `roadmap.md`.
5. Confirm `data/checklist.json` and `data/site.json` are valid JSON.
6. Test JSON export and import.
7. Test printing or saving a report as PDF.
8. Test light, dark, and system theme behavior.
9. Check keyboard navigation and visible focus states.
10. Check mobile, tablet, desktop, and wide layouts.
11. Confirm reduced-motion preferences are respected.
12. Confirm the Netlify attribution remains visible.
13. Confirm all community links work.

## Theme review

When changing theme tokens:

- maintain readable text contrast
- review primary buttons and links
- review success and error colors
- review focus indicators
- review checked checklist cards
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
- short cache lifetimes for editable JSON content
- measured improvements rather than unsupported performance claims

## Community maintenance

Use GitHub Issues for focused work and GitHub Discussions for broader questions and ideas. Keep roadmap issues current and close completed work with a clear release reference.

## Things to avoid

Do not add:

- paid support offers
- affiliate links
- commercial hosting services
- unnecessary tracking scripts
- heavy frameworks without a clear project need
- custom themes that make text or controls difficult to read
