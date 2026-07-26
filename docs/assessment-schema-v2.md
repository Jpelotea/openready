# OpenReady Assessment Schema v2

This document specifies the v0.4.0 project-health assessment model, browser storage, scoring, import migration, export format, and compatibility behavior.

The assessment is a planning tool. It is not legal advice, a security assessment, an accessibility certification, a compliance decision, or a guarantee of acceptance into Netlify or another hosting program.

## Assessment levels

### Core readiness

Core items cover public project foundations that most open-source software projects should address:

- license
- README
- contribution guidance
- Code of Conduct
- changelog and releases
- roadmap
- issue tracker
- security reporting
- governance
- community documentation

### Operational maturity

Maturity items cover deeper practices that help a project operate safely, accessibly, transparently, and sustainably:

- accessibility commitment and verification
- conduct enforcement
- private vulnerability reporting
- threat modeling
- incident response
- contributor onboarding
- support boundaries
- succession and project transfer
- privacy-respecting project metrics
- dependency and asset licensing
- least-privilege repository access

Funding, donations, sponsorships, monetization, paid support, pricing, premium features, advertising, affiliates, and other commercial models are deliberately excluded from the assessment.

## Status values

Every assessment item uses one of four states:

| Status | Score value | Meaning |
|---|---:|---|
| `complete` | 1.0 | The project has implemented the item and can identify supporting evidence. |
| `in-progress` | 0.5 | Meaningful work exists, but the item is not fully implemented or verified. |
| `not-started` | 0.0 | The project has not implemented the item. |
| `not-applicable` | Excluded | The project has a documented reason the item does not apply. |

`not-applicable` should not be used merely to improve a score. The optional item note should record why the item does not apply.

## Optional review fields

Each item may include:

- `evidenceUrl` — a public or internal link selected by the user
- `note` — context, missing work, or a next action
- `reviewedAt` — the last review date in `YYYY-MM-DD` form
- `responsible` — a person, maintainer, working group, or team

OpenReady does not transmit these values. They remain in the current browser unless the user intentionally exports JSON or prints a report.

Users should avoid entering passwords, access tokens, medical information, confidential reports, private personal information, or sensitive project data.

## Scoring

OpenReady calculates three scores:

- Core readiness
- Operational maturity
- Overall project health

For each score:

```text
percentage = earned points / applicable items × 100
```

The result is rounded to the nearest whole percentage.

Example:

- 1 complete item = 1 point
- 1 in-progress item = 0.5 points
- 1 not-started item = 0 points
- 1 not-applicable item = removed from the denominator

If those four items are evaluated together, the score is:

```text
1.5 earned points / 3 applicable items = 50%
```

Scores are intended to help prioritize work. A high score does not prove that evidence is correct, current, accessible, secure, legally sufficient, or accepted by a third party.

## Browser storage

The assessment continues using the existing storage key:

```text
openready-checklist-v1
```

Keeping the key stable allows existing browser progress to be migrated in place.

Schema-v2 browser state has this general structure:

```json
{
  "schemaVersion": 2,
  "items": {
    "license": {
      "status": "complete",
      "evidenceUrl": "https://example.org/license",
      "note": "Reviewed with the release checklist.",
      "reviewedAt": "2026-08-20",
      "responsible": "Maintainers"
    }
  },
  "preservedImportData": {
    "topLevel": {},
    "unknownItems": [],
    "itemFields": {},
    "invalidStatuses": []
  }
}
```

Project notes remain under:

```text
openready-notes-v1
```

Project-profile values remain under:

```text
openready-project-profile-v1
```

## Legacy browser-state migration

Versions v0.1 through v0.3 stored a plain object mapping checklist IDs to booleans.

During migration:

- `true` becomes `complete`
- `false` becomes `not-started`
- newly introduced items start as `not-started`
- existing project notes remain unchanged
- existing project-profile values remain unchanged

The migrated state is saved in schema-v2 form when the user next changes the assessment or imports a file.

## Export format

Schema-v2 exports retain:

```json
{
  "format": "openready-checklist",
  "formatVersion": 2
}
```

The familiar filename also remains:

```text
openready-<project-name>-checklist.json
```

An export includes:

- application version
- export timestamp
- project profile
- core, maturity, and overall summaries
- all known assessment items and review fields
- a legacy `completedItems` projection
- project notes
- preserved unsupported import data when present

The legacy `completedItems` projection marks only `complete` items as `true`. This gives older OpenReady versions a limited way to recover completed known item IDs, although older versions cannot understand partial progress, not-applicable states, maturity levels, or evidence metadata.

## Import migration

OpenReady accepts:

- schema-v2 files with an `items` array
- v0.1-v0.3 files with `completedItems`
- older compatible files using `completed`
- project profiles stored as `project` or legacy `projectProfile`

Legacy imported states map as follows:

- checked or `complete: true` becomes `complete`
- unchecked or `complete: false` becomes `not-started`
- missing current items become `not-started`
- notes and project-profile values are restored

Imports are limited to 2 MB to reduce accidental browser disruption from unexpectedly large files.

## Unsupported-field preservation

OpenReady does not silently discard unrecognized import data.

The importer preserves and reports:

- unknown top-level properties
- unknown assessment-item IDs
- unknown fields attached to known item IDs
- unsupported future status values
- a pre-existing `preservedImportData` object

Preserved values are stored locally inside `preservedImportData` and included in the next export.

Unsupported status values are normalized to `not-started` for scoring and interaction, while the original value is retained in the preservation record.

Preservation does not mean that OpenReady interprets, validates, displays, or endorses an unsupported field.

## Reset behavior

Reset clears:

- project profile
- assessment statuses
- evidence URLs
- item notes
- last-reviewed dates
- responsibility fields
- preserved unsupported import data
- project notes

The reset requires user confirmation.

## Print behavior

Before printing, OpenReady temporarily expands evidence sections so review details can appear in a browser-generated report. The previous open or closed state is restored after printing.

External resource links are hidden from the compact checklist card print layout, while entered evidence values remain available.

## Stable identifiers

The ten v0.1-v0.3 checklist IDs remain unchanged:

- `license`
- `code-of-conduct`
- `readme`
- `contributing`
- `changelog`
- `roadmap`
- `issues`
- `security`
- `governance`
- `community-docs`

New maturity IDs are additive. Existing IDs should not be renamed or reused for a different concept without a documented migration.

## Verification

Automated browser coverage includes:

- keyboard reachability
- four-state persistence
- evidence and review-field persistence
- v0.1-v0.3 import migration
- schema-v2 round-tripping
- unsupported-field preservation
- partial-credit scoring
- not-applicable denominator handling
- project-profile integration
- reset behavior
- print preparation
- reduced motion
- responsive layouts and horizontal-overflow prevention

Automated checks provide repeatable evidence but do not replace human accessibility, security, legal, content-quality, or real-device review.
