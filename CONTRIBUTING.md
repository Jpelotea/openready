# Contributing to OpenReady

Thank you for considering a contribution. OpenReady is designed to be beginner-friendly, so documentation improvements, typo fixes, checklist suggestions, accessibility improvements, testing, issue triage, design feedback, community support, and focused code changes are all valuable.

## Ways to contribute

You can help by:

- improving checklist wording in `data/checklist.json`
- improving guided content in `data/guidance-core.json`, `data/guidance-maturity.json`, or `data/materials.json`
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
- helping measure project health, Lighthouse results, and accessibility evidence without treating numbers as certification or activity quotas

## Before contributing

Please read:

- [README.md](README.md)
- [COMMUNITY.md](COMMUNITY.md)
- [ACCESSIBILITY.md](ACCESSIBILITY.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [GOVERNANCE.md](GOVERNANCE.md)
- [METRICS.md](METRICS.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)
- [getting-started.md](getting-started.md)
- [roadmap.md](roadmap.md)

Changes affecting security boundaries should also review [THREAT_MODEL.md](THREAT_MODEL.md) and [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md).

## First contribution pathway

A first contribution can be documentation, testing, accessibility evidence, issue reproduction, design feedback, or code.

1. Browse issues labeled [`good first issue`](https://github.com/Jpelotea/openready/labels/good%20first%20issue).
2. Read the entire issue and its acceptance criteria.
3. Comment before beginning substantial work so duplicated effort can be avoided.
4. Keep the change limited to the selected issue.
5. Run the listed verification steps.
6. Open a pull request that explains what changed, why it helps, and how it was checked.
7. Respond to review comments when practical.

The label is reserved for small tasks with clear files, outcomes, and verification. It is not used for sensitive security work, broad redesigns, release administration, governance disputes, or specialist accessibility sessions.

See [COMMUNITY.md](COMMUNITY.md) for the complete participation pathway and recognition process.

## `help wanted` tasks

Issues labeled [`help wanted`](https://github.com/Jpelotea/openready/labels/help%20wanted) are scoped tasks where community assistance would be useful. They may require specific experience, assistive technology, physical hardware, or deeper project knowledge.

The label does not promise immediate maintainer availability, assignment, acceptance, or a release date. Review the issue's evidence requirements before volunteering.

## Roles and participation

OpenReady recognizes users, contributors, regular contributors, maintainers, security contacts, and Code of Conduct contacts.

Contribution is broader than code. Useful documentation, accessibility evidence, security review, issue triage, design feedback, support, and community work all count.

A contribution does not automatically grant repository access, a maintainer role, or a guarantee that the work will be merged. Role progression and permission criteria are documented in [GOVERNANCE.md](GOVERNANCE.md).

## Contribution recognition

Release notes may recognize documentation, accessibility, testing, issue-reporting, design, code, and community contributions by GitHub username.

Recognition must be accurate, must not rank people by volume, and must not imply employment, payment, endorsement, or a maintainer role. Contributors may ask not to be named publicly. See [COMMUNITY.md](COMMUNITY.md).

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
- new storage, privacy, backend, account, analytics, or external-service boundaries
- changes to the license, governance, Code of Conduct, security policy, or non-commercial status
- removal or alteration of the exact linked Netlify attribution
- major changes to project purpose or maintainer permissions

A significant proposal should explain alternatives, compatibility, accessibility, security, privacy, maintenance cost, and verification. The maintainer seeks reasoned agreement and records the final rationale when consensus is not reached.

Security incidents, conduct reports, and private personal information may require confidential handling. Confidentiality must not be used to hide ordinary product decisions.

## Conflicts of interest

Disclose a conflict when a personal, professional, financial, organizational, or close-relationship interest could reasonably affect review or decision-making.

A conflicted reviewer should avoid being the sole decision-maker when practical. Do not publish unnecessary private details when disclosing or managing a conflict.

## Editing JSON content

When editing files under `data/`:

- keep the JSON syntax valid
- do not add comments inside JSON files
- keep checklist item IDs stable unless a migration is planned
- keep guidance IDs aligned with checklist IDs
- ensure referenced starter IDs exist in `data/materials.json`
- use complete HTTP or HTTPS URLs for external resources
- keep text concise and beginner-friendly
- test both light and dark themes after changing color tokens
- verify that imported and exported assessment files still work when relevant
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

Do not claim that validation, tests, audit scores, metrics, or an assessment result guarantees security, accessibility, legal compliance, or hosting-program eligibility.

## Validate changes

Run the project data validator before committing:

```bash
python scripts/validate_data.py
```

When guidance or starter materials change, also run:

```bash
python scripts/validate_guidance.py
```

The validators check required fields, duplicate checklist IDs, project links, documentation cards, theme tokens, roadmap entries, guidance coverage, starter references, notices, and prohibited commercial assessment content.

GitHub Actions runs the relevant validation automatically when matching files change in a push or pull request. A failed validation check should be corrected before merging.

## Pull request checklist

Before submitting a pull request, please check:

- The change supports the free, non-commercial open-source purpose of the project.
- The site works through a local static server in a modern browser.
- The assessment and guided content load from the intended JSON files.
- Relevant validation scripts complete successfully.
- Light and dark modes both remain readable.
- Keyboard navigation and visible focus states still work.
- Form labels, instructions, errors, and status messages remain understandable.
- Reduced-motion preferences are respected.
- Mobile, tablet, desktop, short-laptop, and ultra-wide layouts remain usable when affected.
- User-entered and imported values are rendered safely.
- Workflow permissions remain no broader than necessary.
- Significant decisions have a focused public proposal and recorded rationale when applicable.
- Relevant conflicts of interest were disclosed and managed.
- Confidential conduct, security, accessibility, and personal information was kept out of public issues, pull requests, commits, metrics snapshots, and workflow logs.
- The exact linked Netlify attribution remains visible in the footer.
- Documentation, accessibility, security, support, governance, metrics, roadmap, and community links still work.
- No analytics, tracking, funding, donation, sponsorship, paid support, consulting, hosting, advertising, affiliate, pricing, subscription, premium-feature, or paid-access capability is introduced.
- The change follows the Code of Conduct.

## Review and response expectations

The project is maintained on a best-effort basis. Opening a pull request does not guarantee acceptance, repository access, a project role, recognition in a particular release, or a release date.

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

You do not need to be an expert developer to contribute. Small, focused improvements are welcome, including documentation corrections, accessibility observations, test evidence, clearer issue reports, starter-material reviews, and constructive community support.