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
- Operational governance role definitions for users, contributors, regular contributors, maintainers, security contacts, and Code of Conduct contacts.
- Decision classes, significant-change discussion requirements, role progression, permission criteria, conflict handling, inactivity, succession, project transfer, and emergency-authority procedures.
- A detailed Code of Conduct reporting and enforcement process with conflict-aware handling for reports involving the sole maintainer.
- Core-readiness and operational-maturity assessment levels.
- Four item states: `complete`, `in-progress`, `not-started`, and `not-applicable`.
- Optional evidence URL, item note, last-reviewed date, and responsible-person or team fields.
- Separate core-readiness, operational-maturity, and overall project-health scores.
- Assessment schema version 2 with a documented migration and compatibility model.
- Unsupported-import preservation for unknown top-level fields, item fields, item IDs, and future status values.
- A 2 MB import-size limit for assessment JSON files.
- Detailed schema, scoring, storage, migration, export, reset, and print documentation in `docs/assessment-schema-v2.md`.
- Plain-language improvement guidance for every core-readiness and operational-maturity assessment item.
- Minimum and stronger implementations, common mistakes, example evidence, and further resources for all 22 assessment items.
- Ten editable Markdown starters covering README planning, accessibility, security, threat modeling, incident response, governance, support, conduct enforcement, privacy-respecting metrics, and license review.
- Visible legal, security, and accessibility limitation notices above the assessment workspace.
- Dedicated guidance-content validation through `scripts/validate_guidance.py`.
- Guided-material operation, privacy, validation, verification, and maintenance documentation in `docs/guided-project-materials.md`.
- A public community participation pathway in `COMMUNITY.md` for first contributions, repeat participation, project labels, contribution types, recognition, privacy, and conduct.
- Privacy-respecting project measurement definitions in `METRICS.md`.
- A reproducible monthly, release, or project-health snapshot format in `docs/metrics-snapshot-template.md`.
- A genuinely scoped `good first issue` for reviewing one guided starter and `help wanted` labels for human accessibility tasks requiring community equipment or experience.

### Changed

- Expanded `SECURITY.md` with supported-version guidance, acknowledgement expectations, scope examples, severity, prioritization, remediation, disclosure, threat-model, and contributor-security sections.
- Expanded README navigation, privacy guidance, repository structure, accessibility, security, incident-readiness, support, roadmap, metrics, and community documentation.
- Expanded the contribution process with accessibility, security, governance, conduct, first-contribution, label, recognition, metrics, conflict-disclosure, and confidential-reporting expectations.
- Expanded the maintainer guide with label criteria, contributor recognition, sustainable metrics review, and release attribution checks.
- Replaced the original high-level governance note with an operational maintainer-led model appropriate to a small project.
- Expanded the Code of Conduct with project scope, unacceptable behavior examples, private reporting, acknowledgement, privacy, evidence handling, enforcement levels, outcome communication, reconsideration, anti-retaliation, false-report safeguards, and maintainer accountability.
- Replaced the binary checklist interface with a four-state assessment while retaining the existing browser-storage key for in-place migration.
- Expanded the checklist from ten foundation items to ten core-readiness and twelve operational-maturity items.
- Added partial scoring for in-progress items and removed not-applicable items from score denominators.
- Kept a legacy `completedItems` projection in schema-v2 exports so older OpenReady versions can recover completed known item IDs.
- Updated project-profile import, export, reset, and status messages for the assessment model.
- Expanded JSON validation for schema version, levels, statuses, item levels, stable IDs, and out-of-scope commercial assessment concepts.
- Added an expandable **How to improve this item** section to each assessment card without changing scoring, storage, or import compatibility.
- Added copy, Markdown download, and restore actions for editable starter materials.
- Expanded data, browser-accessibility, and Lighthouse workflow triggers to cover guided-content files and interface behavior.
- Replaced the temporary project-metrics issue link with the permanent `METRICS.md` policy and linked contributor onboarding to `COMMUNITY.md`.
- Added Community pathways and Project metrics to the data-driven documentation cards without changing the official v0.3.0 release status.

### Accessibility

- Documented the difference between automated evidence and human accessibility verification.
- Published the current manual-testing gaps and linked the related screen-reader, zoom, high-contrast, and real-device issues.
- Added a conflict-aware public/private accessibility reporting route that warns against sharing sensitive information.
- Included accessibility needs and communication differences in community conduct and review expectations.
- Replaced checkbox-only progress controls with labeled native select controls for all four states.
- Added keyboard-reachable evidence and review-detail fields with visible focus styles.
- Added accessible core, maturity, and overall score labels.
- Added responsive single-column assessment layouts for narrow screens.
- Expanded assessment details automatically during print preparation and restored their previous state afterward.
- Implemented guided content with native `details` and `summary` controls, labeled editable textareas, and keyboard-reachable material actions.
- Kept repeated starter materials associated with unique control IDs and labels.
- Added narrow-screen guidance reflow, stacked mobile actions, and print expansion with state restoration.
- Distinguished specialist human accessibility tasks from beginner tasks and labeled the desktop, mobile, zoom, contrast, and device reviews as `help wanted` rather than `good first issue`.

### Security

- Documented assets, trust boundaries, browser-input risks, JSON import risks, repository and workflow risks, release integrity, deployment integrity, residual risk, and review triggers.
- Added a best-effort five-business-day acknowledgement target for clear sensitive reports.
- Defined practical Critical, High, Moderate, and Low security severity guidance.
- Clarified that OpenReady is not a security certification or managed incident-response service.
- Added bounded import-size handling and safe normalization of unsupported statuses.
- Preserved unknown imported values rather than silently discarding them.
- Kept editable starter drafts outside assessment storage, scoring, and JSON exports.
- Warned users not to place passwords, tokens, confidential vulnerability reports, private conduct reports, or unnecessary personal information in starter text.
- Kept metrics snapshots limited to aggregate repository activity and project-controlled records without copying private security, conduct, accessibility, or personal data.

### Governance and community

- Defined routine, significant public, and confidential decision classes.
- Required significant changes to document alternatives, accessibility, security, privacy, compatibility, maintenance cost, and verification.
- Documented reasoned consensus seeking and final maintainer rationale when consensus is not reached.
- Added least-privilege repository-access criteria and multi-factor-authentication expectations for maintainers.
- Added conflict disclosure, recusal, permission review, temporary absence, succession, archival, and project-transfer safeguards.
- Documented that no independent Code of Conduct contact will be invented or named without explicit consent.
- Added proportionate conduct enforcement from informal correction through permanent removal and platform escalation.
- Added anti-retaliation and one-time reconsideration protections while distinguishing unsubstantiated reports from knowingly false reports.
- Kept funding, donations, sponsorships, monetization, paid support, pricing, and other commercial concepts outside the assessment model and validator-approved item scope.
- Kept funding, donations, sponsorships, pricing, paid support, consulting, hosting services, advertising, affiliates, and monetization outside guided materials and project metrics.
- Required starter text to name only real roles and contacts that have agreed to serve.
- Defined `good first issue` as small, non-sensitive, permission-free, documented work and `help wanted` as scoped work that may require experience or equipment.
- Recognized documentation, accessibility, testing, issue reporting, triage, design, code, and community support without ranking contribution value by code volume.
- Added release-note recognition rules that respect contributor consent and avoid implying employment, payment, endorsement, or maintainer status.
- Documented that response measurements are not service-level agreements and metrics must not create contributor quotas or maintainer productivity targets.
- Classified stars, forks, views, visitors, clones, and referrals as optional awareness indicators rather than project-health or eligibility evidence.

### Verification

- Expanded Playwright coverage for four-state persistence, evidence fields, review metadata, legacy migration, schema-v2 imports and exports, unsupported-field preservation, partial scoring, not-applicable handling, project-profile integration, reset, print preparation, reduced motion, responsive layouts, and horizontal overflow.
- Added guidance validation for complete checklist coverage, required notices, explanation structure, valid resource links, starter references, starter filenames, and prohibited commercial material IDs.
- Added browser checks for all 22 guidance sections, starter editing and Markdown download, restoration, unique control IDs, keyboard access, print preparation, and 320-pixel reflow.
- Documented exact GitHub search queries, classification rules, evidence requirements, limitations, review cadence, and interpretation rules for reproducible project-health snapshots.
- Confirmed the community-and-metrics implementation introduces no website analytics, tracking service, user-data transmission, funding metric, or commercial measurement.

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