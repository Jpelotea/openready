# Manual Accessibility and Device Testing

Automated Lighthouse checks are useful, but they do not prove that every person can use OpenReady successfully. This checklist covers the manual testing that should accompany automated results.

## Testing status

- Automated local Lighthouse baseline: completed
- Production Lighthouse audit: completed; see [production-audit.md](production-audit.md)
- Keyboard-only review: requires a human tester
- Screen-reader review: requires a human tester using assistive technology
- Real-device review: requires testing on representative phones, tablets, and desktop browsers
- Manual testing tracker: [issue #14](https://github.com/Jpelotea/openready/issues/14)

A test should only be marked complete after a person has performed it and recorded the date, browser, operating system, and result.

## Keyboard-only test

Use the site without a mouse or touch input.

1. Reload the page and press `Tab`.
2. Confirm the skip link appears and moves focus to the main content.
3. Move through the navigation, theme control, primary actions, checklist controls, notes field, import, export, print, reset, documentation cards, roadmap link, community links, and footer links.
4. Confirm every interactive element has a visible focus indicator.
5. Confirm focus order follows the visual and reading order.
6. Activate buttons and links with `Enter` or `Space` as appropriate.
7. Confirm checklist items can be selected and deselected from the keyboard.
8. Confirm the theme switch communicates its current state.
9. Open and cancel the file picker without trapping focus.
10. Confirm no keyboard trap occurs anywhere on the page.

## Screen-reader test

Recommended combinations:

- NVDA with Firefox or Chrome on Windows
- VoiceOver with Safari on macOS
- VoiceOver with Safari on iPhone
- TalkBack with Chrome on Android

Review the following:

1. The page title and main purpose are announced clearly.
2. Landmarks for navigation, main content, sections, forms, and footer are understandable.
3. Heading levels provide a logical outline.
4. The theme button has a meaningful name and state.
5. Checklist labels, descriptions, categories, and resource links are announced in a useful order.
6. Progress changes are announced without excessive interruption.
7. Tool status messages are announced after import, export, print, and reset actions.
8. The notes field has a clear label and supporting instructions.
9. Links make sense outside their surrounding paragraph.
10. Decorative visual elements are not announced unnecessarily.

## Zoom and reflow test

1. Test browser zoom at 200% and 400%.
2. Confirm content reflows without horizontal scrolling at a viewport equivalent to 320 CSS pixels, except where a specific component genuinely requires two-dimensional scrolling.
3. Confirm text is not clipped or overlapped.
4. Confirm buttons and form controls remain visible and usable.
5. Confirm the checklist, roadmap, documentation cards, and footer remain understandable in a single-column layout.

## Theme and contrast review

1. Test both light and dark modes.
2. Confirm text, borders, controls, status messages, focus indicators, and links remain readable.
3. Confirm meaning is not communicated by color alone.
4. Confirm the system theme is used when no manual preference has been saved.
5. Confirm the saved theme is restored without a visible flash of the wrong theme.
6. Test with increased-contrast or forced-colors settings when available.

## Reduced-motion review

1. Enable the operating system's reduced-motion preference.
2. Reload the page.
3. Confirm reveal animations and transitions no longer create noticeable movement.
4. Confirm no content remains hidden because animation was disabled.

## Real-device matrix

Record at least one result in each category:

| Category | Suggested environment | Result | Notes |
|---|---|---|---|
| Small phone | iPhone SE-size viewport or compact Android phone | Pending | |
| Modern phone | Current iPhone or Android device | Pending | |
| Tablet | iPad or Android tablet in portrait and landscape | Pending | |
| Desktop | Windows, macOS, or Linux at 100% and 200% zoom | Pending | |
| Ultra-wide | Desktop viewport wider than 1600 pixels | Pending | |

## Functional checks during accessibility testing

Confirm that:

- checklist progress persists after reload
- JSON export downloads a valid file
- JSON import restores progress and notes
- invalid JSON produces a clear error message
- print preview contains the readiness report rather than the full marketing page
- reset asks for confirmation and clears only checklist progress and notes
- external project and community links open the expected resources

## Recording a completed test

For each testing session, record:

- date and time
- tester name or GitHub username
- device and operating system
- browser and version
- assistive technology and version, when applicable
- test sections completed
- problems found and their related GitHub issue numbers
- overall result: pass, pass with observations, or needs work

Automated scores must not be used as a substitute for these manual results.
