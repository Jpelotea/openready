# Getting Started

OpenReady helps maintainers assess and improve the public health of an open-source software repository.

## Who this is for

This project is useful for:

- new maintainers
- beginner developers
- documentation contributors
- small open-source communities
- educators teaching open-source practices
- project owners preparing public repositories

## Use the hosted app

1. Open the [OpenReady website](https://getopenready.netlify.app/).
2. Optionally add the project name, repository URL, maintainer or team, and target review date.
3. Review each checklist item.
4. Mark items that the project already satisfies.
5. Use the notes field to record missing work or next actions.
6. Export the project profile and checklist as JSON when a backup is needed.
7. Import a previous JSON export to restore project identity, progress, and notes.
8. Use **Print report** to print the identified summary or save it as a PDF.

Project-profile values, checklist progress, and notes remain in the current browser unless they are intentionally exported or printed.

## Optional project profile

The project profile helps identify which repository a report belongs to. Every field is optional:

- **Project name** — used in the report and exported filename
- **Repository URL** — the public or private source location being reviewed
- **Maintainer or team** — the person or group responsible for follow-up
- **Target release or review date** — the date connected to the current readiness review

Profile values are saved locally using the `openready-project-profile-v1` browser-storage key.

When a project name is present, exported files use this pattern:

```text
openready-<project-name>-checklist.json
```

Older OpenReady exports without a project profile remain importable.

## Light and dark themes

OpenReady follows the browser or operating system theme when there is no saved preference.

Use the theme button in the navigation to switch manually. The chosen theme is saved in local browser storage.

The dark theme uses a muted blue accent system to reduce glare. The decorative repository-network artwork adapts to each theme, stops moving when reduced motion is requested, and is simplified or removed on smaller screens.

## Responsive hero layout

The hero is designed for phones, tablets, desktop monitors, ultra-wide displays, and short laptop viewports. On supported desktop widths, height-aware layout rules keep the primary checklist action and project-health preview usable within the first screen.

This behavior is covered by automated Playwright testing at `1600 × 860` in addition to the standard viewport checks.

## Run OpenReady locally

OpenReady has no package installation or build step. It loads content from JSON files, so it should be run through a local static server rather than opened directly with a `file://` URL.

From the repository directory, run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Update checklist content

Edit:

```text
data/checklist.json
```

Each checklist item may contain:

- a stable `id`
- a category
- a title
- a plain-language description
- an optional resource label
- an optional resource URL

Keep existing IDs stable when possible so saved and exported checklist progress remains compatible.

## Update site content and colors

Edit:

```text
data/site.json
```

This file contains:

- application version and project links
- product principles
- feature cards
- documentation cards
- roadmap entries
- light and dark theme tokens

When customizing theme colors, verify readable contrast for body text, buttons, links, cards, focus states, success messages, and error messages.

The decorative hero artwork is stored in `hero-orbit.svg`, while its placement, opacity, responsive behavior, and reduced-motion rules are maintained in `docs-grid.css`.

Project-profile storage, export, import, reset, and filename behavior are maintained in `profile.js`.

## Release history

Every shipped version is documented in:

- [RELEASES.md](RELEASES.md) for readable release summaries and compatibility notes
- [CHANGELOG.md](CHANGELOG.md) for detailed changes
- [roadmap.md](roadmap.md) for current and planned work

Upcoming work must remain labeled as planned or unreleased until the version, changelog, release summary, roadmap, and user documentation are all updated.

## What the checklist covers

The current checklist focuses on:

- license
- Code of Conduct
- README
- contributing guide
- changelog
- roadmap
- issue tracker
- security policy
- project governance
- community-facing project documentation

## Important note

OpenReady is not legal advice, security certification, or a guarantee that a repository will qualify for any hosting or sponsorship program. It is a practical organizational tool for maintainers.
