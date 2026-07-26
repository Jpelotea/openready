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
2. Review each checklist item.
3. Mark items that the project already satisfies.
4. Use the notes field to record missing work or next actions.
5. Export the checklist as JSON when a backup is needed.
6. Import a previous JSON export to restore progress.
7. Use **Print report** to print the summary or save it as a PDF.

Checklist progress and notes remain in the current browser unless they are intentionally exported.

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
