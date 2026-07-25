# Automated Browser Accessibility Testing

OpenReady uses Playwright and Chromium in GitHub Actions to check important browser behaviors that complement Lighthouse.

## Automated coverage

The workflow verifies:

- the skip link is the first keyboard focus target
- main controls are reachable by keyboard
- checklist items can be changed with the keyboard
- checklist progress persists after reload
- the theme control exposes and preserves its state
- the Import JSON button opens a file chooser
- imported checklist data and notes are restored
- reveal content remains visible with reduced motion enabled
- the page avoids horizontal overflow at 320, 390, 768, 1440, and 1920 pixel viewports
- key content remains usable with 200% text sizing at a narrow viewport

Viewport screenshots, Playwright reports, traces, screenshots, and videos are retained as GitHub Actions artifacts when available.

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

## Important limitations

These checks use browser automation. They do not prove that the application works correctly with every assistive technology or physical device.

The following still require a person:

- judging whether focus order is intuitive rather than merely reachable
- confirming focus indicators are consistently easy to perceive
- cancelling and returning from native file-picker dialogs on each operating system
- browser zoom review at 200% and 400%
- desktop screen-reader review
- mobile screen-reader review
- touch-target comfort and usability on physical phones and tablets
- visual review in forced-colors and platform-specific high-contrast modes

Human evidence remains tracked in `docs/manual-accessibility-testing.md` and GitHub issue #14.
