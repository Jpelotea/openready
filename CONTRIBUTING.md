# Contributing to OpenReady

Thank you for considering a contribution. OpenReady is designed to be beginner-friendly, so documentation improvements, typo fixes, checklist suggestions, accessibility improvements, and focused code changes are all valuable.

## Ways to contribute

You can help by:

- improving checklist wording in `data/checklist.json`
- adding beginner-friendly explanations and resource links
- reviewing light and dark theme contrast
- improving theme tokens in `data/site.json`
- fixing bugs in the browser application
- improving accessibility and responsive layouts
- suggesting new documentation pages
- reporting confusing sections
- helping measure Lighthouse and accessibility targets

## Before contributing

Please read:

- [README.md](README.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [GOVERNANCE.md](GOVERNANCE.md)
- [getting-started.md](getting-started.md)
- [roadmap.md](roadmap.md)

## Run the project locally

OpenReady loads JSON content with `fetch`, so use a local static server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No package installation or build process is required.

## How to suggest a change

1. Open an issue describing the problem or idea.
2. Keep the suggestion specific and practical.
3. For code changes, create a branch and submit a pull request.
4. Explain what changed, why it matters, and how it was checked.

## Editing JSON content

When editing `data/checklist.json` or `data/site.json`:

- keep the JSON syntax valid
- do not add comments inside JSON files
- keep checklist item IDs stable unless a migration is planned
- use complete HTTP or HTTPS URLs for external resources
- keep text concise and beginner-friendly
- test both light and dark themes after changing color tokens
- verify that imported and exported checklist files still work

## Validate changes

Run the project data validator before committing:

```bash
python scripts/validate_data.py
```

The validator checks required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, and roadmap entries.

GitHub Actions runs the same validation automatically when relevant files change in a push or pull request. A failed validation check should be corrected before merging.

## Pull request checklist

Before submitting a pull request, please check:

- The change supports the non-commercial open-source purpose of the project.
- The site works through a local static server in a modern browser.
- The checklist loads from `data/checklist.json`.
- `python scripts/validate_data.py` completes successfully.
- Light and dark modes both remain readable.
- Keyboard navigation and visible focus states still work.
- Reduced-motion preferences are respected.
- Mobile, tablet, desktop, and ultra-wide layouts remain usable.
- The Netlify attribution remains visible in the footer.
- Documentation, governance, roadmap, and community links still work.
- The change follows the Code of Conduct.

## Beginner note

You do not need to be an expert developer to contribute. Small, focused improvements are welcome.
