# Contributing to OpenReady

Thank you for considering a contribution. OpenReady is designed to be beginner-friendly, so documentation improvements, typo fixes, checklist suggestions, accessibility improvements, testing, issue triage, and focused code changes are all valuable.

## Ways to contribute

You can help by:

- improving checklist wording in `data/checklist.json`
- adding beginner-friendly explanations and resource links
- reviewing light and dark theme contrast
- improving theme tokens in `data/site.json`
- fixing bugs in the browser application
- improving accessibility and responsive layouts
- performing documented keyboard, screen-reader, zoom, reflow, forced-colors, or real-device testing
- reviewing imports, exports, storage, rendering, and workflow security
- improving project policies and contributor guidance
- helping with issue triage, decision records, and community support
- suggesting focused documentation pages
- reporting confusing sections
- helping measure Lighthouse and accessibility targets without treating scores as certification

## Before contributing

Please read:

- [README.md](README.md)
- [ACCESSIBILITY.md](ACCESSIBILITY.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [GOVERNANCE.md](GOVERNANCE.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)
- [getting-started.md](getting-started.md)
- [roadmap.md](roadmap.md)

Changes affecting security boundaries should also review [THREAT_MODEL.md](THREAT_MODEL.md) and [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md).

## Roles and participation

OpenReady recognizes users, contributors, regular contributors, maintainers, security contacts, and Code of Conduct contacts.

Contribution is broader than code. Useful documentation, accessibility evidence, security review, issue triage, design feedback, support, and community work all count.

A contribution does not automatically grant repository access, a maintainer role, or a guarantee that the work will be merged. Role progression and permission criteria are documented in [GOVERNANCE.md](GOVERNANCE.md).

## Run the project locally

OpenReady loads JSON content with `fetch`, so use a local static server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No package installation or build process is required for normal use.

## How to suggest a change

1. Search existing issues and discussions.
2. Open one focused issue using the most relevant template.
3. Explain the problem, who it affects, and why it fits OpenReady's purpose.
4. For code or documentation changes, create a branch and submit a pull request.
5. Explain what changed, why it matters, how it was checked, and which issue it addresses.

Use the accessibility issue form for keyboard, screen-reader, zoom, reflow, contrast, motion, form, touch, or cognitive barriers. Follow [SECURITY.md](SECURITY.md) instead of opening a public issue when a report contains exploit details or another sensitive vulnerability.

Do not open a public issue containing private Code of Conduct allegations, identifying personal information, or confidential evidence. Follow the private process in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Significant project decisions

Routine corrections and accepted focused tasks can normally proceed through an issue and pull request.

Propose significant changes publicly before implementation when practical. Examples include:

- breaking import or export changes
- new scoring or checklist models
- new storage, privacy, backend, account, or external-service boundaries
- changes to the license, governance, Code of Conduct, security policy, or non-commercial status
- removal or alteration of the exact linked Netlify attribution
- major changes to project purpose or maintainer permissions

A significant proposal should explain alternatives, compatibility, accessibility, security, privacy, maintenance cost, and verification. The maintainer seeks reasoned agreement and records the final rationale when consensus is not reached.

Security incidents, conduct reports, and private personal information may require confidential handling. Confidentiality must not be used to hide ordinary product decisions.

## Conflicts of interest

Disclose a conflict when a personal, professional, financial, organizational, or close-relationship interest could reasonably affect review or decision-making.

A conflicted reviewer should avoid being the sole decision-maker when practical. Do not publish unnecessary private details when disclosing or managing a conflict.

## Editing JSON content

When editing `data/checklist.json` or `data/site.json`:

- keep the JSON syntax valid
- do not add comments inside JSON files
- keep checklist item IDs stable unless a migration is planned
- use complete HTTP or HTTPS URLs for external resources
- keep text concise and beginner-friendly
- test both light and dark themes after changing color tokens
- verify that imported and exported checklist files still work
- avoid adding funding, donation, sponsorship, commercial-service, advertising, affiliate, pricing, or paid-access links

## Accessibility review

For interface changes, review the relevant requirements in [ACCESSIBILITY.md](ACCESSIBILITY.md).

At minimum, check:

- semantic headings, landmarks, labels, and instructions remain meaningful
- all affected controls work with the keyboard
- visible focus is not removed or obscured
- status and error changes are announced appropriately
- light and dark themes remain readable
- zoom and narrow reflow do not hide core tasks
- reduced-motion preferences are respected
- meaningful images have useful alternative text
- decorative images do not create unnecessary screen-reader output

Automated checks are evidence, not proof of WCAG conformance. Significant changes should include an appropriate manual spot check.

## Security review

For changes affecting imports, exports, storage, rendering, workflows, external links, releases, or deployment:

- treat imported and user-entered values as untrusted data
- do not insert user-controlled values as HTML
- avoid logging secrets, private data, or exploit details
- use the least GitHub Actions permissions needed
- review third-party actions and dependencies
- preserve safe failures for malformed or unsupported input
- update [THREAT_MODEL.md](THREAT_MODEL.md) when a trust boundary changes
- add regression coverage for a corrected vulnerability when feasible

Do not claim that validation, tests, audit scores, or a checklist result guarantees security, accessibility, legal compliance, or hosting-program eligibility.

## Validate changes

Run the project data validator before committing:

```bash
python scripts/validate_data.py
```

The validator checks required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, and roadmap entries.

GitHub Actions runs the same validation automatically when relevant files change in a push or pull request. A failed validation check should be corrected before merging.

## Pull request checklist

Before submitting a pull request, please check:

- The change supports the free, non-commercial open-source purpose of the project.
- The site works through a local static server in a modern browser.
- The checklist loads from `data/checklist.json`.
- `python scripts/validate_data.py` completes successfully when relevant.
- Light and dark modes both remain readable.
- Keyboard navigation and visible focus states still work.
- Form labels, instructions, errors, and status messages remain understandable.
- Reduced-motion preferences are respected.
- Mobile, tablet, desktop, short-laptop, and ultra-wide layouts remain usable when affected.
- User-entered and imported values are rendered safely.
- Workflow permissions remain no broader than necessary.
- Significant decisions have a focused public proposal and recorded rationale when applicable.
- Relevant conflicts of interest were disclosed and managed.
- Confidential conduct, security, and personal information was kept out of public issues, pull requests, commits, and workflow logs.
- The exact linked Netlify attribution remains visible in the footer.
- Documentation, accessibility, security, support, governance, roadmap, and community links still work.
- No funding, donation, sponsorship, paid support, consulting, hosting, advertising, affiliate, pricing, subscription, premium-feature, or paid-access capability is introduced.
- The change follows the Code of Conduct.

## Review and response expectations

The project is maintained on a best-effort basis. Opening a pull request does not guarantee acceptance, repository access, a project role, or a release date.

Review may result in a request to:

- reduce the scope
- add evidence or tests
- improve accessibility or security behavior
- disclose or manage a conflict
- update documentation or a decision record
- defer the work to a later release
- close the proposal as outside project scope

See [SUPPORT.md](SUPPORT.md) for response targets, maintainer boundaries, and triage outcomes. See [GOVERNANCE.md](GOVERNANCE.md) for final-decision, permission, inactivity, temporary-absence, succession, and transfer procedures.

## Beginner note

You do not need to be an expert developer to contribute. Small, focused improvements are welcome, including documentation corrections, accessibility observations, test evidence, clearer issue reports, and constructive community support.