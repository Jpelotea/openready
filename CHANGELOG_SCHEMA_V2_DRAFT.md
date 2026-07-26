# Schema v2 changelog summary

This temporary review note records the changes proposed by Issue #28 before they are folded into `CHANGELOG.md` during pull-request review.

- Replaces binary checklist state with complete, in-progress, not-started, and not-applicable statuses.
- Adds core-readiness and operational-maturity levels.
- Adds evidence URL, item note, last-reviewed date, and responsible-person or team fields.
- Adds separate core, maturity, and overall scores with partial credit and not-applicable exclusion.
- Adds schema-v2 JSON exports and v0.1-v0.3 migration.
- Preserves unsupported imported fields for re-export.
- Adds a 2 MB import limit.
- Adds responsive and print styles for assessment details.
- Expands Playwright and JSON validation coverage.
- Keeps funding and commercial concepts out of the assessment model.

This file should be removed after the entries are integrated into the main changelog.