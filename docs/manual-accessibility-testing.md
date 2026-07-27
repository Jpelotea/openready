# Manual Accessibility and Device Testing

Automated Lighthouse and Playwright checks provide useful regression evidence, but they do not prove that every person can use OpenReady successfully. This guide defines the human testing required for the v0.4.0 release candidate.

The evidence register is maintained in [manual-accessibility-results.md](manual-accessibility-results.md).

## Current status

- Automated local Lighthouse checks: completed for the current implementation
- Automated keyboard, naming, migration, theme, reduced-motion, import, and responsive checks: completed
- Human keyboard-only review: pending
- Desktop screen-reader review: pending
- Mobile screen-reader review: pending
- Browser zoom at 200%, 300%, and 400%: pending
- Reflow, text resize, and forced-colors review: pending
- Representative physical-device review: pending

A test is complete only after a person performs it and records the date, tester, exact environment, tested URL or commit, completed scope, result, observations, and related defect issues.

## Work queue

- [Parent manual testing tracker — issue #14](https://github.com/Jpelotea/openready/issues/14)
- [Desktop screen reader and keyboard review — issue #17](https://github.com/Jpelotea/openready/issues/17)
- [Mobile screen reader review — issue #18](https://github.com/Jpelotea/openready/issues/18)
- [Browser zoom, reflow, and high contrast — issue #19](https://github.com/Jpelotea/openready/issues/19)
- [Representative real-device usability matrix — issue #20](https://github.com/Jpelotea/openready/issues/20)
- [v0.4.0 manual verification coordinator — issue #32](https://github.com/Jpelotea/openready/issues/32)

Use the repository’s **Accessibility test session** issue template for each session. Create one focused accessibility-barrier issue for each defect rather than combining unrelated failures into a general report.

## Release-candidate rule

Always record the exact production URL and commit tested. A result from an older build cannot be treated as evidence for a newer release candidate without a retest of the affected workflow.

A single session may cover several matrix areas when the same person actually performs them in the recorded environment. Do not infer untested results from automated screenshots, emulation, code inspection, or a different operating system.

## Core end-to-end workflow

Across the complete evidence set, people must exercise these tasks:

1. Open the production site and identify its title, purpose, and main regions.
2. Use the skip link, navigation, theme control, and primary action.
3. Enter and edit the optional project profile.
4. Change assessment items among Complete, In progress, Not started, and Not applicable.
5. Open evidence and review details and use the evidence URL, note, last-reviewed date, and responsible-person fields.
6. Open improvement guidance and review headings, resource links, safety notices, and reading order.
7. Edit a guided Markdown starter and use copy, download, and restore actions where supported.
8. Confirm core, maturity, and overall score changes are understandable.
9. Add project notes and confirm browser-local persistence after reload.
10. Export JSON and import both a valid file and invalid JSON.
11. Review the print preview or platform print explanation.
12. Reset the workspace and confirm the project profile, assessment state, evidence details, and notes are cleared after confirmation.
13. Review documentation, roadmap, community, policy, and footer links.

## Keyboard-only protocol

Use the site without a mouse or touch input.

1. Reload and press `Tab`; confirm the skip link appears first and moves focus to main content.
2. Move through navigation, theme, primary actions, project profile, every assessment status, evidence details, guidance, starter controls, notes, import, export, print, reset, documentation cards, community links, and footer links.
3. Confirm focus order follows the visual and reading order.
4. Confirm every focused control has a visible indicator at normal and increased zoom.
5. Activate controls with `Enter`, `Space`, arrow keys, or native select commands as appropriate.
6. Open and cancel the native file picker; confirm focus returns to a sensible control.
7. Confirm no keyboard trap or unexpected focus loss occurs.
8. Confirm native details and summary controls can be opened and closed.
9. Confirm reset remains cancelable and does not clear data until accepted.

## Desktop screen-reader protocol

Preferred combinations:

- NVDA with Firefox or Chrome on Windows
- VoiceOver with Safari on macOS

Review:

1. Page title, purpose, landmarks, and heading outline.
2. Skip-link announcement and destination.
3. Theme-control name and state.
4. Project-profile labels and optional-field instructions.
5. Assessment-status names; each repeated status must include the assessment-item title.
6. Evidence fields and details; each repeated field must include the assessment-item title.
7. Improvement-guidance sections; each must be distinguishable by assessment item.
8. Starter editors and copy, download, and restore actions; names must include material and item context.
9. Score labels, progress changes, and tool-status announcements.
10. Import, export, invalid-file errors, print, and reset flow.
11. Link purpose outside surrounding paragraphs.
12. Decorative visuals remaining outside the useful reading order.

## Mobile screen-reader protocol

Preferred combinations:

- VoiceOver with Safari on iPhone
- TalkBack with Chrome on Android

Review in portrait and landscape when supported:

1. Swipe navigation through headings, landmarks, links, buttons, form controls, details, and assessment items.
2. Touch exploration and activation of compact controls.
3. Theme name and state.
4. Project-profile and assessment-field labels.
5. Status, evidence, guidance, and starter-action names.
6. Score, progress, and status-message announcements.
7. Orientation changes without focus loss or unexpected navigation.
8. Notes, import/export explanation, print explanation, and reset.
9. Touch-target comfort and spacing.
10. No hidden, overlapped, unreachable, or unexpectedly repeated content.

## Zoom, text resize, and reflow protocol

Test browser zoom at **200%, 300%, and 400%**.

1. Confirm ordinary page content reflows without two-dimensional scrolling.
2. Confirm no text, labels, controls, cards, details, or status messages are clipped or overlapped.
3. Confirm project-profile, assessment, evidence, guidance, starter, notes, and tool controls remain operable.
4. Confirm visible focus remains perceivable.
5. Confirm documentation cards, roadmap, community links, and footer remain understandable.
6. Test an approximately 320 CSS-pixel viewport or equivalent reflow condition.
7. Test browser or operating-system text-size controls where supported.
8. Retest the documentation-card area previously corrected in issue #21.

## Theme, contrast, and forced-colors protocol

1. Test both light and dark themes.
2. Confirm text, borders, form controls, status messages, links, badges, and focus indicators remain understandable.
3. Confirm state and meaning are not conveyed by color alone.
4. Confirm system theme is used when no manual preference is stored.
5. Confirm the saved theme returns without a distracting wrong-theme flash.
6. Test Windows forced colors, platform high contrast, or an equivalent supported mode.
7. Record any browser or operating-system limitations that prevented a contrast mode from being tested.

## Reduced-motion protocol

1. Enable the operating system’s reduced-motion preference.
2. Reload the production site.
3. Confirm reveal effects and transitions no longer create noticeable movement.
4. Confirm no content remains hidden or delayed because motion was disabled.
5. Confirm theme changes, details controls, progress updates, and status messages remain understandable.

## Real-device matrix

Record at least one qualifying human result in each category.

| Category | Suggested environment | Current result | Evidence |
|---|---|---|---|
| Small phone | Compact physical iPhone or Android phone | Pending | Issue #20 |
| Modern phone | Current physical iPhone or Android phone | Pending | Issue #20 |
| Tablet | Physical iPad or Android tablet in portrait and landscape | Pending | Issue #20 |
| Desktop or laptop | Physical Windows, macOS, or Linux computer | Pending | Issues #17 and #20 |
| Ultra-wide desktop | Physical or representative viewport wider than 1600 CSS pixels | Pending | Issue #20 |

For every environment, review navigation, profile entry, assessment controls, guidance, starter materials, notes, tools, links, themes, orientation, spacing, and practical target sizes.

## Result values

- **Pass** — the completed scope was usable and no defect was found.
- **Pass with observations** — usable, with non-blocking findings recorded.
- **Needs work** — a barrier made a task difficult or impossible; create focused defect issues.
- **Incomplete** — the declared scope was not finished and does not satisfy a matrix requirement.

## Evidence required

Record:

- date and approximate time
- tester or GitHub username
- exact device or representative environment
- operating system and version
- browser and version
- assistive technology and version, when applicable
- zoom, theme, contrast, motion, and orientation settings
- exact production URL or commit
- coverage and tasks completed
- result value
- observations
- focused defect issue numbers
- safe screenshots or recordings when useful

Do not include credentials, private project data, medical information, confidential security details, or unnecessary personal information.

## Closing rules

Issues #14, #17, #18, #19, #20, and #32 must remain open until their stated human evidence is complete. A Lighthouse score, Playwright run, browser emulation, screenshot, code review, or undocumented visual inspection cannot substitute for a recorded human session.

Results must not be described as universal accessibility or WCAG certification. They are environment-specific evidence used to identify and reduce barriers.
