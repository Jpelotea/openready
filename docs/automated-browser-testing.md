# Automated Browser Accessibility Testing

OpenReady uses Playwright and Chromium in GitHub Actions to check important browser behavior, backward compatibility, accessible naming, and responsive layout. These checks complement Lighthouse and the project-data validators.

Automation provides repeatable evidence. It does not prove that OpenReady works correctly with every assistive technology, browser, operating system, or physical device.

## Automated coverage

The workflow verifies:

- the skip link is the first keyboard focus target
- main controls and project-profile fields are keyboard reachable
- all four assessment statuses can be selected
- status, evidence, notes, review dates, and responsibility persist locally
- core, maturity, and overall scoring apply partial credit correctly
- not-applicable items are removed from score denominators
- schema-v2 imports and exports round-trip assessment and project-profile data
- unsupported future fields and items are preserved for re-export
- reset clears project identity, assessment data, evidence, review details, and notes
- print preparation expands assessment and guidance details and restores prior state
- the theme control exposes and preserves its state
- reveal content remains visible with reduced motion enabled
- guided materials are editable, downloadable, restorable, and uniquely identified
- safety notices and all 22 guidance sections are present
- repeated controls expose item-specific accessible names
- malformed JSON and oversized imports produce error messages
- the page avoids horizontal overflow at 320, 390, 768, 1440, 1600, and 1920 pixel viewports
- the desktop hero remains usable at a short-laptop viewport of `1600 × 860`

## Historical migration fixtures

OpenReady keeps representative fixtures under `tests/fixtures/`:

- `legacy-v0.1.0.json`
- `legacy-v0.2.0.json`
- `legacy-v0.3.0.json`

The fixtures match the actual historical export structures:

- v0.1.0 used the `completed` array and a descriptive `project` string
- v0.2.0 used `formatVersion: 1`, `applicationVersion`, `summary`, and `completedItems`
- v0.3.0 retained format version 1 and added the structured project-profile object

The browser suite verifies that known item states and notes migrate, v0.3.0 project identity is restored, and removed historical items are preserved for re-export instead of silently discarded.

The fixtures are test evidence. They are not current example exports and should not be edited to resemble schema version 2.

## Accessible naming coverage

Keyboard reachability alone is not sufficient when many controls have the same visible label.

The v0.4.0 suite verifies item-specific names for:

- every assessment-status select
- every evidence URL field
- every item-note field
- every last-reviewed date field
- every responsible-person or team field
- every evidence-and-review details control
- every improvement-guidance details control
- every editable starter textarea
- every copy, Markdown-download, and restore action

Visible labels remain concise while accessible names include the related assessment-item title.

## Project-profile and schema-v2 round trip

The current round-trip tests:

1. fill the project name, repository URL, maintainer or team, and review date
2. set assessment statuses and evidence details
3. reload and confirm local persistence
4. export a schema-v2 JSON report
5. verify project identity, notes, status, evidence, compatibility fields, and filename
6. import representative legacy and schema-v2 payloads
7. preserve unknown future fields and invalid future statuses
8. reset the workspace
9. confirm project and assessment values are cleared

## Short-laptop hero regression

The short-laptop test checks that:

- the **Start the checklist** call to action remains above the fold
- the complete project-health preview remains above the fold
- the headline uses a controlled number of lines
- the final headline line is not an isolated word
- no horizontal overflow is introduced

The desktop hero uses height-aware CSS because width-only responsive checks would not catch a layout that falls below the initial viewport after browser chrome and operating-system controls reduce the available height.

## Failure evidence

The workflow uploads these paths with `if: always()`:

- `playwright-report/`
- `test-results/`

Artifacts may include HTML reports, traces, screenshots, videos, and the six viewport screenshots. They are retained for 30 days.

The GitHub Actions job log remains the primary evidence when installation, server startup, or test execution fails before a report is produced.

## Run locally

From the repository root:

```bash
npm install --no-save @playwright/test@1.52.0
npx playwright install chromium
python3 -m http.server 8080
```

In another terminal:

```bash
npx playwright test
```

Run only the Issue #31 coverage with:

```bash
npx playwright test tests/validation-browser-coverage.spec.js
```

Project-data validation is documented separately in [automated-validation.md](automated-validation.md).

## Important limitations

These checks do not establish WCAG conformance, security, legal compliance, certification, or hosting-program eligibility.

The following still require a person:

- judging whether focus order is intuitive rather than merely reachable
- confirming focus indicators are consistently easy to perceive
- cancelling and returning from native file-picker dialogs on each operating system
- browser zoom review at 200%, 300%, and 400%
- desktop screen-reader review
- mobile screen-reader review
- touch-target comfort and usability on physical phones and tablets
- visual review in forced-colors and platform-specific high-contrast modes

Human evidence remains tracked in `docs/manual-accessibility-testing.md` and GitHub Issues #14 and #32.
