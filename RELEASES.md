# OpenReady Release History

This document provides a human-readable summary of every shipped OpenReady software release.

For line-by-line changes, see [CHANGELOG.md](CHANGELOG.md). For planned work, see [roadmap.md](roadmap.md). Browse all published versions on the [GitHub Releases page](https://github.com/Jpelotea/openready/releases).

## Release status

| Version | Date | Status | Focus |
|---|---|---|---|
| [v0.3.0](https://github.com/Jpelotea/openready/releases/tag/v0.3.0) | 2026-07-27 | Current | Project profiles, identified reports, release documentation, and production-layout refinement |
| [v0.2.1](https://github.com/Jpelotea/openready/releases/tag/v0.2.1) | 2026-07-25 | Released | JSON-first content, adaptive themes, automation, and quality baselines |
| [v0.2.0](https://github.com/Jpelotea/openready/releases/tag/v0.2.0) | 2026-07-25 | Released | Interface redesign, JSON import, and print-ready reporting |
| [v0.1.0](https://github.com/Jpelotea/openready/releases/tag/v0.1.0) | 2026-06-28 | Released | Initial repository-health checklist and community foundation |

## [v0.3.0](https://github.com/Jpelotea/openready/releases/tag/v0.3.0) — Project profiles and identified reports

**Released:** July 27, 2026

### Purpose

Make exported and printed readiness reports easier to identify, share, and revisit without introducing accounts, analytics, or a backend.

### Highlights

- Added an optional project profile with fields for:
  - project name
  - repository URL
  - maintainer or team
  - target release or review date
- Saved profile values locally in the current browser.
- Included project profile data in JSON exports.
- Restored profile data during JSON import.
- Included project identity in print and PDF reports.
- Cleared profile data together with checklist progress and notes during reset.
- Added project-based export filenames when a project name is available.
- Added automated browser coverage for profile persistence, keyboard access, import, export, reset, and responsive reflow.
- Completed the lightweight SVG repository-network hero background.
- Refined light and dark theme accent colors.
- Added a height-aware desktop hero layout for short laptop screens.
- Added regression coverage that keeps the primary action and project-health preview above the fold.
- Updated the public project URL and metadata to `https://getopenready.netlify.app/`.
- Added this complete release-history document.

### Compatibility

- Existing v0.1 and v0.2 checklist exports remain importable.
- The new `project` object in exported JSON is optional.
- Existing checklist item IDs and local checklist storage keys remain unchanged.
- OpenReady still runs entirely in the browser and does not transmit profile or checklist data.

## [v0.2.1](https://github.com/Jpelotea/openready/releases/tag/v0.2.1) — Data, theming, and maintenance foundation

**Released:** July 25, 2026

### Purpose

Separate frequently updated content from application logic and establish a more maintainable, measurable quality foundation.

### Highlights

- Moved checklist content to `data/checklist.json`.
- Moved project links, documentation cards, roadmap entries, and theme tokens to `data/site.json`.
- Added system-aware light and dark modes with a saved manual preference.
- Added flicker-resistant theme initialization.
- Added configurable semantic color tokens.
- Added native browser reveal and progress animations.
- Preserved reduced-motion safeguards.
- Added canonical, Open Graph, and SoftwareApplication structured metadata.
- Added automated JSON validation.
- Added repeatable local and production Lighthouse workflows.
- Documented performance, accessibility, best-practices, and SEO baselines.
- Added automated Playwright browser accessibility and responsive-reflow checks.
- Added governance documentation and clearer maintainer responsibilities.

### Compatibility

- Local development requires a static HTTP server because JSON content is loaded with `fetch`.
- Existing v0.2.0 browser progress and exported checklist data remain compatible.

## [v0.2.0](https://github.com/Jpelotea/openready/releases/tag/v0.2.0) — Interface and reporting

**Released:** July 25, 2026

### Purpose

Turn the initial checklist into a clearer, more usable repository-health application.

### Highlights

- Redesigned the complete website interface.
- Repositioned OpenReady as a repository-health software tool.
- Added JSON import for restoring previous checklist work.
- Added print-friendly readiness reports.
- Added success and error status messages for checklist tools.
- Added security-policy and governance checklist items.
- Added direct project-documentation, issue, discussion, and community-policy links.
- Improved phone and tablet layouts.
- Strengthened keyboard focus states and reduced-motion behavior.

### Compatibility

- Continued using the original checklist progress storage key.
- Exported files remained JSON-based and browser-readable.

## [v0.1.0](https://github.com/Jpelotea/openready/releases/tag/v0.1.0) — Initial foundation

**Released:** June 28, 2026

### Purpose

Provide a simple browser-based checklist for understanding the public health of an open-source repository.

### Highlights

- Added the initial repository-health checklist.
- Added automatic completion progress.
- Saved checklist progress in `localStorage`.
- Added project notes.
- Added JSON export.
- Published the MIT License.
- Added a Code of Conduct.
- Added contributing guidance.
- Added a security policy.
- Added governance and maintainer documentation.
- Added the required Netlify attribution in the site footer.

### Compatibility

- Established the stable checklist item identifiers and original browser-storage format used by later releases.

## Release documentation policy

Every shipped OpenReady version must include:

1. a dated entry in [CHANGELOG.md](CHANGELOG.md)
2. a summary in this file
3. an updated current-version value in `data/site.json` and application metadata
4. an updated status in [roadmap.md](roadmap.md)
5. updated user or contributor documentation when behavior changes
6. automated or documented manual verification appropriate to the change
7. a published GitHub Release linked from this document

Upcoming work is documented as planned or unreleased and must not be presented as shipped until these records are complete.
