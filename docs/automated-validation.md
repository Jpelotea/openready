# Automated Project Data Validation

OpenReady validates its data-driven assessment, guidance, materials, site configuration, and non-commercial project scope before relevant changes are merged.

Automation provides repeatable evidence. It does not certify accessibility, security, legal compliance, open-source-plan eligibility, or the quality of every sentence and external resource.

## Validation commands

Run these commands from the repository root:

```bash
python scripts/validate_data.py
python scripts/validate_guidance.py
python scripts/validate_project_scope.py
python tests/test_validators.py
```

The GitHub Actions workflow `.github/workflows/validate-data.yml` runs the same commands when relevant JSON, validator, test, or workflow files change.

## Core data validator

`scripts/validate_data.py` checks:

- checklist schema version 2
- the exact core and maturity levels
- the four supported assessment statuses
- required checklist fields
- stable lowercase kebab-case item IDs
- duplicate IDs
- valid item levels
- valid resource URLs and labels
- required application configuration
- complete HTTP or HTTPS project links
- documentation card structure
- required light- and dark-theme tokens
- roadmap entry structure and states
- prohibited funding or commercial assessment identities

Failures identify the affected file, item, theme, token, or field whenever practical.

## Guidance and starter validator

`scripts/validate_guidance.py` checks:

- guidance and starter schema versions
- exactly three safety notices: legal, security, and accessibility
- one guidance record for every assessment item
- no guidance records for unknown items
- why-it-matters text
- minimum and stronger implementations
- common mistakes
- example evidence
- complete HTTP or HTTPS resource links
- valid starter references
- the required set of ten editable Markdown starters
- unique kebab-case material IDs
- `.md` filenames
- prohibited commercial starter identities

## Non-commercial scope validator

`scripts/validate_project_scope.py` protects the public configuration surfaces that could introduce an OpenReady feature or external link.

It checks:

- checklist IDs, categories, titles, resource labels, and resource URLs
- site link keys and URLs
- public principle, feature, document, and roadmap identities
- guidance item IDs, starter references, resource labels, and resource URLs
- guided-material IDs, titles, and filenames

It rejects funding, donation, sponsorship, crowdfunding, monetization, pricing, premium access, paid support, paid access, consulting, affiliate, advertising, revenue, and sales-funnel configuration.

The validator intentionally does not scan every explanatory paragraph. Project documentation may need to state that a commercial concept is prohibited or out of scope. Validation focuses on identifiers and links that can create a public feature or route.

## Validator regression tests

`tests/test_validators.py` verifies that:

- the current repository data passes all validator functions
- an incorrect checklist schema version fails with the expected version
- a missing theme token identifies the affected theme and token
- an unsafe guidance resource identifies the item and resource number
- a donation link identifies the exact site-link path
- a premium document card is rejected
- a funding guidance resource is rejected
- a paid-support material identity is rejected

These tests prevent the validators from silently weakening while the project evolves.

## Failure evidence

Validation output is written directly to the GitHub Actions job log. Each failure is printed as a separate bullet below a clear validation heading.

The workflow uses read-only repository permissions. It does not transmit assessment data, project profiles, notes, evidence fields, review dates, responsible-person values, or guided-material drafts.

## Maintenance rules

When adding or changing project-controlled JSON:

1. Run all four commands locally.
2. Correct the first concrete error rather than bypassing validation.
3. Add a regression test when fixing a validator defect.
4. Keep validation messages specific and actionable.
5. Do not weaken the non-commercial checks to add funding or commercial features.
6. Review external resources manually for relevance and current accuracy.

## Limitations

Automated validation cannot determine whether:

- guidance is appropriate for every project
- an external page remains accurate after validation
- a legal license is suitable for a particular use
- security controls are sufficient
- human accessibility testing has been completed
- a hosting provider will accept an application

Those judgments require separate human review and current evidence.
