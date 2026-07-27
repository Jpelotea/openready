# Manual Accessibility Results

This document is the evidence register for human accessibility and real-device testing of OpenReady.

Automated Lighthouse and Playwright results are recorded elsewhere. They do not count as human sessions in this register and do not establish universal WCAG conformance.

## Current release-candidate status

No complete qualifying human test session has yet been recorded for the v0.4.0 release candidate.

The current production deployment may change while v0.4.0 is being prepared. Every session must record the exact OpenReady URL and commit tested so results are not attributed to a different build.

## Required coverage matrix

A row changes from **Pending** only after a person performs the test and records the environment, completed tasks, outcome, observations, and related defect issues.

| Coverage area | Minimum qualifying environment | Status | Evidence |
|---|---|---|---|
| Human keyboard-only review | Current desktop browser and operating system | Pending | Issue #17 |
| Desktop screen reader | NVDA with Firefox or Chrome on Windows, or VoiceOver with Safari on macOS | Pending | Issue #17 |
| Mobile screen reader | VoiceOver with Safari on iPhone, or TalkBack with Chrome on Android | Pending | Issue #18 |
| Browser zoom | 200%, 300%, and 400% in a current desktop browser | Pending | Issue #19 |
| Reflow and text resize | Approximately 320 CSS pixels and increased text where supported | Pending | Issue #19 |
| Forced colors or high contrast | Windows forced colors, platform high contrast, or an equivalent supported mode | Pending | Issue #19 |
| Light and dark themes | Both themes on at least one desktop and one mobile environment | Pending | Issues #17–#20 |
| Reduced motion | Operating-system reduced-motion preference on a real browser | Pending | Issues #17–#20 |
| Small phone | Compact physical phone or equivalent real-device environment | Pending | Issue #20 |
| Modern phone | Current physical iPhone or Android phone | Pending | Issue #20 |
| Tablet | Physical tablet in portrait and landscape | Pending | Issue #20 |
| Desktop or laptop | Physical desktop or laptop | Pending | Issues #17 and #20 |
| Ultra-wide desktop | Physical or representative desktop wider than 1600 CSS pixels | Pending | Issue #20 |

## Required end-to-end tasks

Each qualifying session should cover the tasks relevant to its environment. Across the complete evidence set, the following workflow must be exercised by people rather than inferred from automation:

1. Open the production site and identify the page purpose.
2. Use the skip link, navigation, theme control, and primary action.
3. Enter and edit the optional project profile.
4. Change assessment items among Complete, In progress, Not started, and Not applicable.
5. Open evidence and review details; use evidence URL, note, last-reviewed date, and responsible-person fields.
6. Open improvement guidance and review its headings, resource links, and safety notices.
7. Edit a guided Markdown starter and use copy, download, and restore actions where supported.
8. Confirm core, maturity, and overall score changes are understandable.
9. Add project notes and confirm local persistence after reload.
10. Export JSON, import a valid historical or schema-v2 file, and review error handling for invalid JSON.
11. Review print preview and confirm the assessment report is usable.
12. Reset the workspace and confirm the project profile, assessment state, evidence details, and notes are cleared after confirmation.
13. Review documentation, roadmap, community, policy, and footer links.

A single session does not need to perform an impractical action in its environment. For example, native print behavior may be documented on desktop while mobile testing records whether the control and explanation remain understandable.

## Result values

Use one of these outcomes:

- **Pass** — the completed scope was usable and no defect was found.
- **Pass with observations** — the completed scope was usable, but non-blocking observations or improvements were recorded.
- **Needs work** — one or more barriers made a tested task difficult or impossible; each defect must have a focused issue.
- **Incomplete** — the environment or session ended before the declared scope was completed; this does not satisfy a matrix requirement.

## Recorded sessions

No qualifying v0.4.0 human sessions have been committed yet.

When a session is complete, add one row and link its GitHub issue or committed report.

| Session | Date | Tester | Environment | Coverage | Result | Defects |
|---|---|---|---|---|---|---|
| — | — | — | — | — | Pending | — |

## Prior observations requiring retest

A documentation-card alignment problem was previously reported during zoom/reflow review and resolved in issue #21. That fix still requires a complete recorded retest at 200%, 300%, and 400% zoom before issue #19 can be closed.

## Evidence rules

A qualifying record must include:

- date and approximate time
- tester name or GitHub username
- exact device or representative environment
- operating system and version
- browser and version
- assistive technology and version, when applicable
- accessibility settings, zoom, orientation, and theme
- exact OpenReady URL or commit
- tasks and coverage completed
- result value
- observations
- focused issue numbers for every defect
- screenshots or recordings only when they do not expose private information

Do not include medical information, credentials, private project data, confidential security details, or unnecessary personal information.

## Completion rule

Issue #32, parent issue #14, and focused issues #17–#20 must remain open until their required human evidence is complete. A passing automated workflow, Lighthouse score, browser screenshot, code review, or unrecorded visual check cannot replace these sessions.
