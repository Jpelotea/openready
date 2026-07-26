# Changelog

All notable changes to OpenReady are documented in this file.

The format follows a simple release-based structure inspired by Keep a Changelog. Human-readable release summaries are available in [RELEASES.md](RELEASES.md).

## Unreleased

### Added

- An accessibility commitment and reporting process in `ACCESSIBILITY.md`.
- A structured public accessibility issue form for keyboard, screen-reader, zoom, reflow, contrast, motion, form, touch, and cognitive barriers.
- Maintainer support channels, response targets, scope boundaries, triage outcomes, and sustainable-availability guidance in `SUPPORT.md`.
- A lightweight architecture and trust-boundary review in `THREAT_MODEL.md`.
- A documented security incident-response process in `INCIDENT_RESPONSE.md`.

### Changed

- Expanded `SECURITY.md` with supported-version guidance, acknowledgement expectations, scope examples, severity, prioritization, remediation, disclosure, threat-model, and contributor-security sections.
- Expanded README navigation, privacy guidance, repository structure, accessibility, security, incident-readiness, support, roadmap, and non-commercial documentation.
- Expanded the contribution process with accessibility and security review expectations and explicit protection against funding or commercial features.

### Accessibility

- Documented the difference between automated evidence and human accessibility verification.
- Published the current manual-testing gaps and linked the related screen-reader, zoom, high-contrast, and real-device issues.
- Added a conflict-aware public/private accessibility reporting route that warns against sharing sensitive information.

### Security

- Documented assets, trust boundaries, browser-input risks, JSON import risks, repository and workflow risks, release integrity, deployment integrity, residual risk, and review triggers.
- Added a best-effort five-business-day acknowledgement target for clear sensitive reports.
- Defined practical Critical, High, Moderate, and Low security severity guidance.
- Clarified that OpenReady is not a security certification or managed incident-response service.

## [0.3.0] - 2026-07-27

### Added

- An optional project profile for project name, repository URL, maintainer or team, and target release or review date.
- Local browser persistence for project profile values.
- Project profile data in JSON exports and imports.
- Project-based export filenames when a project name is available.
- Project profile details in printed and PDF readiness reports.
- A complete human-readable release record in `RELEASES.md`.
- A lightweight decorative repository-network sphere in `hero-orbit.svg`, implemented without WebGL or a third-party animation library.
- Height-aware desktop hero rules for short laptop viewports.
- A Playwright regression check at `1600 × 860` that verifies the primary call to action and complete project-health preview remain above the fold.
- Automated project-profile coverage for keyboard access, persistence, import, export, reset, and responsive reflow.
- Automated JSON content and configuration validation through GitHub Actions.
- A reusable local validator at `scripts/validate_data.py`.
- Validation for required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, and roadmap entries.
- A prominently configured Governance documentation card and governance project link.
- Lighthouse CI configuration in `lighthouserc.json`.
- A GitHub Actions Lighthouse workflow with downloadable HTML and JSON reports.
- Measured performance and accessibility guidance in `docs/performance.md`.
- A separate Lighthouse configuration and workflow for auditing the public Netlify deployment.
- Production audit evidence and measured results in `docs/production-audit.md`.
- A human keyboard, screen-reader, zoom, reflow, theme, reduced-motion, and real-device test plan in `docs/manual-accessibility-testing.md`.

### Changed

- Renamed the public Netlify project to `getopenready` and updated canonical, structured-data, setup, and audit references to `https://getopenready.netlify.app/`.
- Aligned documentation-card labels, titles, descriptions, and responsive columns consistently.
- Softened the dark-theme accent palette to reduce visual glare while preserving readable contrast.
- Refined the hero composition so the repository sphere supports rather than obscures the project-health preview.
- Rebalanced desktop hero columns, headline wrapping, spacing, and preview density so the complete first-screen experience works on common laptop heights.
- Expanded README community-health documentation and repository structure.
- Added governance and automated validation guidance to the contribution process.
- Replaced unverified performance claims with documented targets and measured results.
- Updated the roadmap after establishing the first Lighthouse baseline.
- Distinguished local-static-build scores from public production-deployment scores.
- Limited production auditing to a bounded representative run so unreachable or stale deployments still produce useful evidence.
- Reset now clears the optional project profile together with checklist progress and notes.

### Accessibility

- Added accessible labels and instructions for every project-profile field.
- Kept all project-profile fields keyboard reachable and optional.
- Added an accessible name to the hidden checklist-import file input.
- Updated compact brand-link accessible names so they include the visible `OR` text.
- Fixed the accessibility findings identified by the first Lighthouse audit.
- Added a manual testing process for checks that automated tools cannot verify.
- Kept the decorative hero artwork non-interactive with `pointer-events: none` and outside the accessibility tree.
- Disabled decorative motion when `prefers-reduced-motion: reduce` is active.
- Simplified or removed the decorative sphere at smaller breakpoints to protect readability and mobile performance.
- Added automated checks that prevent the hero call to action, preview card, and headline wrapping from regressing on short desktop viewports.

### Quality baseline

- The first representative local audit measured 100 Performance, 91 Accessibility, 96 Best Practices, and 100 SEO.
- After correcting the identified accessibility labels and missing favicon, all three final local-static-build runs measured 100 in Performance, Accessibility, Best Practices, and SEO.
- The initial public Netlify audit measured 91 Performance, 91 Accessibility, 96 Best Practices, and 100 SEO.
- After deploying the corrected `main` branch, three production runs measured Performance at 88, 100, and 100; Accessibility, Best Practices, and SEO measured 100 in all three runs.
- Browser automation now includes project-profile round-tripping, mobile, tablet, desktop, ultra-wide, reduced-motion, keyboard, persistence, overflow, and short-laptop hero regression coverage.

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