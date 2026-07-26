# Accessibility

OpenReady is intended to be usable by people with different abilities, devices, input methods, and levels of technical experience.

## Commitment

The project aims to meet WCAG 2.2 Level AA where reasonably achievable for the OpenReady interface and project-controlled documentation.

This is a continuing engineering and community goal, not a certification claim. Automated checks cannot establish full accessibility, and the project may still contain barriers that have not yet been identified.

## Current approach

OpenReady uses:

- semantic HTML and native controls where practical
- visible keyboard focus styles
- keyboard-operable primary workflows
- labeled form fields and status messages
- reduced-motion support
- responsive layouts and reflow safeguards
- light and dark theme tokens
- descriptive alternative text for meaningful images
- automated Playwright browser checks
- repeatable Lighthouse accessibility audits
- documented manual testing for screen readers, zoom, forced colors, and physical devices

Automated testing is documented in [docs/automated-browser-testing.md](docs/automated-browser-testing.md). Manual testing plans and evidence are documented in [docs/manual-accessibility-testing.md](docs/manual-accessibility-testing.md).

## Current verification status

Automated checks cover important keyboard, responsive-layout, reduced-motion, and accessible-name behavior. Human testing is still required for desktop screen readers, mobile screen readers, high zoom, forced colors, and a broader real-device matrix.

Open work is tracked in:

- [Desktop screen-reader review](https://github.com/Jpelotea/openready/issues/17)
- [Mobile screen-reader review](https://github.com/Jpelotea/openready/issues/18)
- [Zoom, reflow, and high-contrast review](https://github.com/Jpelotea/openready/issues/19)
- [Real-device testing matrix](https://github.com/Jpelotea/openready/issues/20)
- [v0.4.0 manual accessibility verification](https://github.com/Jpelotea/openready/issues/32)

## Supported environments

OpenReady is designed for current modern browsers on desktop and mobile. The automated browser suite currently uses Chromium. Other browsers and assistive technologies require documented human verification before the project can make environment-specific claims.

External websites linked from OpenReady are controlled by their respective owners and may have different accessibility characteristics.

## Reporting an accessibility barrier

Use the repository's accessibility issue form when a report can be discussed publicly. Do not include private, medical, account, or other sensitive personal information.

A useful report includes:

- the affected page, section, or task
- browser and operating system
- assistive technology and version, when applicable
- keyboard, screen-reader, zoom, reflow, contrast, or motion context
- expected behavior
- actual behavior
- whether the barrier blocks a core task
- any known workaround

For a report that cannot be shared publicly, contact:

```text
peloteajoshuacarl0@gmail.com
```

Use a subject such as `OpenReady accessibility report` and include only the information needed to understand the barrier.

## Prioritization

Accessibility reports are reviewed according to:

1. whether a core task is blocked
2. whether no workaround is available
3. the number of users or environments likely to be affected
4. safety, privacy, and data-loss risk
5. the effort and regression risk of the change

The project is maintained on a best-effort basis. Reports will be acknowledged as capacity allows, and urgent blockers will be prioritized over cosmetic differences.

## Contribution expectations

Changes that affect the interface should preserve:

- logical headings and landmarks
- accessible names and descriptions
- keyboard operation
- visible focus
- readable contrast in light and dark themes
- reduced-motion behavior
- zoom and reflow support
- useful status announcements

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project review checklist.

## Feedback

Accessibility feedback, testing help, documentation corrections, and assistive-technology observations are welcome. Reports should describe observed behavior without assuming that an automated score proves conformance.