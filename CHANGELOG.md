# Changelog

All notable changes to OpenReady are documented in this file.

The format follows a simple release-based structure inspired by Keep a Changelog.

## Unreleased

### Added

- Automated JSON content and configuration validation through GitHub Actions.
- A reusable local validator at `scripts/validate_data.py`.
- Validation for required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, and roadmap entries.
- A prominently configured Governance documentation card and governance project link.
- Lighthouse CI configuration in `lighthouserc.json`.
- A GitHub Actions Lighthouse workflow with downloadable HTML and JSON reports.
- Measured performance and accessibility guidance in `docs/performance.md`.
- An SVG favicon for the application.
- A separate Lighthouse configuration and workflow for auditing the public Netlify deployment.
- Production audit evidence and measured results in `docs/production-audit.md`.
- A human keyboard, screen-reader, zoom, reflow, theme, reduced-motion, and real-device test plan in `docs/manual-accessibility-testing.md`.

### Changed

- Expanded README community-health documentation and repository structure.
- Added governance and automated validation guidance to the contribution process.
- Replaced unverified performance claims with documented targets and measured results.
- Updated the roadmap after establishing the first Lighthouse baseline.
- Distinguished local-static-build scores from public production-deployment scores.
- Limited production auditing to a bounded representative run so unreachable or stale deployments still produce useful evidence.

### Accessibility

- Added an accessible name to the hidden checklist-import file input.
- Updated compact brand-link accessible names so they include the visible `OR` text.
- Fixed the accessibility findings identified by the first Lighthouse audit.
- Added a manual testing process for checks that automated tools cannot verify.

### Quality baseline

- The first representative local audit measured 100 Performance, 91 Accessibility, 96 Best Practices, and 100 SEO.
- After correcting the identified accessibility labels and missing favicon, all three final local-static-build runs measured 100 in Performance, Accessibility, Best Practices, and SEO.
- The initial public Netlify audit measured 91 Performance, 91 Accessibility, 96 Best Practices, and 100 SEO.
- The production report showed accessibility and favicon findings already fixed on `main`, confirming that the public deployment needs to be updated before a fair current-code comparison.

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
