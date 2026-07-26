# Production Deployment Audit

This document records quality checks performed against the public OpenReady deployment rather than the repository served locally.

## Public deployment

- URL: https://getopenready.netlify.app/
- Netlify site ID: `ce11cbd9-5785-475a-9488-5d3122b9e6f2`
- Last recorded post-deployment audit: July 25, 2026
- Audit environment: GitHub Actions, Lighthouse mobile simulation
- Production audit runs: 3
- Evidence retention: GitHub Actions artifact retained for 30 days

The project was renamed from the original generated Netlify name to `getopenready`. The site ID remained the same.

## Reachability and response

The public site returned HTTP `200` and served HTML successfully.

Observed response protections included:

- HTTPS with Strict-Transport-Security
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- permissions restrictions for camera, microphone, and geolocation

## Last recorded category scores

| Run | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| 1 | 88 | 100 | 100 | 100 |
| 2 | 100 | 100 | 100 | 100 |
| 3 | 100 | 100 | 100 | 100 |

The repeated runs show normal production variability, especially for Performance. Accessibility, Best Practices, and SEO measured 100 in all three runs.

These results describe the deployed build at the time of the audit. They are not permanent guarantees, and the repository has received visual and responsive changes since this baseline.

## Resolved production findings

The first production audit had reported:

- a missing accessible label for the JSON import file input
- a compact header brand accessible-name mismatch
- a footer home link without a discernible accessible name
- a missing favicon request that caused a browser-console error

The corrected `main` branch was deployed and the three-run post-deployment audit no longer reported those findings. Deployment follow-up issue #13 was closed after verification.

## Current responsive quality work

Subsequent interface work added:

- a lightweight decorative SVG repository-network sphere
- refined light- and dark-theme visual treatment
- consistently aligned documentation cards
- a height-aware desktop hero composition
- a short-laptop Playwright regression check at `1600 × 860`

The regression test verifies that the primary checklist action and complete project-health preview remain within the initial viewport, the headline avoids an isolated final word, and the page does not introduce horizontal overflow.

Because these changes were made after the last recorded production Lighthouse baseline, a new production audit should be generated before publishing new score claims.

## Manual testing status

Lighthouse and Playwright cannot establish complete accessibility conformance. Human review remains necessary for logical focus order, keyboard traps, screen-reader behavior, browser zoom, forced-colors presentation, and touch usability on physical devices.

The human keyboard, screen-reader, zoom, reflow, theme, reduced-motion, and real-device review is tracked in [issue #14](https://github.com/Jpelotea/openready/issues/14) and described in [manual-accessibility-testing.md](manual-accessibility-testing.md).

## Running the next production baseline

1. Confirm the latest `main` branch is deployed to `https://getopenready.netlify.app/`.
2. Run the `Production deployment audit` workflow.
3. Review all three Lighthouse runs rather than relying on one result.
4. Record category scores and important performance metrics.
5. Compare local and production results without presenting them as interchangeable.
6. Create focused issues for any remaining production-only findings.

The local GitHub Actions baseline and production Netlify baseline must remain clearly distinguished in project documentation.
