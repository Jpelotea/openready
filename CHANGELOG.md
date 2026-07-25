# Changelog

All notable changes to OpenReady are documented in this file.

The format follows a simple release-based structure inspired by Keep a Changelog.

## Unreleased

### Added

- Automated JSON content and configuration validation through GitHub Actions.
- A reusable local validator at `scripts/validate_data.py`.
- Validation for required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, and roadmap entries.
- A prominently configured Governance documentation card and governance project link.

### Changed

- Expanded README community-health documentation and repository structure.
- Added governance and automated validation guidance to the contribution process.
- Separated the remaining Lighthouse performance audit into a focused tracked task.

## [0.2.1] - 2026-07-25

### Added

- JSON-driven checklist content in `data/checklist.json`.
- Central site configuration in `data/site.json`.
- Configurable light and dark theme color tokens.
- System-aware theme selection with a saved manual preference.
- Flicker-resistant theme initialization before the stylesheet loads.
- Native Intersection Observer reveal animations.
- Subtle native progress and project-status animations.
- Search metadata, canonical URL, Open Graph metadata, and SoftwareApplication structured data.
- Checklist categories and direct resource links.
- Responsive support for ultra-wide displays.

### Changed

- Separated frequently updated content from core application logic.
- Reworked checklist rendering to use safe DOM APIs and JSON data.
- Improved the readiness progress ring with a dynamic visual indicator.
- Updated README, roadmap, and local-development instructions.
- Local development now requires a static web server because JSON content is loaded with `fetch`.

### Accessibility

- Theme controls include accessible labels and state information.
- Animations continue to respect `prefers-reduced-motion`.
- Both light and dark themes use centralized semantic color tokens.

## [0.2.0] - 2026-07-25

### Added

- JSON import for restoring exported checklist progress.
- Print-friendly readiness reports.
- Tool status messages for import, export, print, and reset actions.
- Repository health items for security policy and governance.
- Direct links to project documentation, issues, discussions, and community policies.

### Changed

- Redesigned the complete website interface.
- Improved responsive behavior for phones and tablets.
- Strengthened keyboard focus states and reduced-motion support.
- Repositioned OpenReady as a repository-health software tool rather than an application-readiness page.
- Updated README and roadmap to match the current software structure and features.

## [0.1.0] - 2026-06-28

### Added

- Initial browser-based open-source readiness checklist.
- Local progress saving with `localStorage`.
- JSON export for checklist results.
- Community-facing documentation pages.
- MIT License.
- Code of Conduct.
- Contributing guide.
- Security policy.
- Governance note.
- Netlify attribution in the site footer.
