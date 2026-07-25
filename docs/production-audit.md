# Production Deployment Audit

This document records quality checks performed against the public OpenReady deployment rather than the repository served locally.

## Public deployment

- URL: https://capable-chaja-458cb0.netlify.app/
- Audit date: July 25, 2026
- Audit environment: GitHub Actions, Lighthouse mobile simulation
- Lighthouse version: 12.6.1
- Production audit runs: 1 bounded run
- Evidence retention: GitHub Actions artifact retained for 30 days

## Reachability and response

The public site returned HTTP `200` and served HTML successfully.

Observed response protections included:

- HTTPS with Strict-Transport-Security
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- permissions restrictions for camera, microphone, and geolocation

The downloaded HTML contained the current OpenReady project title and version markers through `v0.3.0`, including the active `v0.2.1` interface content.

## Measured category scores

| Category | Production score | Project target |
|---|---:|---:|
| Performance | 91 | 90 or higher |
| Accessibility | 91 | 95 or higher |
| Best Practices | 96 | 95 or higher |
| SEO | 100 | 95 or higher |

The production deployment met the current Performance, Best Practices, and SEO targets. It did not meet the Accessibility target.

## Performance observations

Representative metrics included:

- First Contentful Paint: 2.3 seconds
- Largest Contentful Paint: 2.3 seconds
- Speed Index: 2.3 seconds
- Total Blocking Time: 260 milliseconds
- Time to Interactive: 2.7 seconds

The audit also identified render-blocking stylesheet work and approximately 3.1 seconds of main-thread activity in the simulated mobile environment. These findings should be reviewed again after the latest repository build has been deployed.

## Accessibility and best-practices findings

The production audit reported:

- the JSON import file input did not have an accessible label
- the compact header brand's accessible name did not include its visible text
- the footer home link did not have a discernible accessible name in the compact layout
- the browser requested a missing `favicon.ico`, causing a console error

These findings were already corrected in the repository during pull request #11 and passed the final local Lighthouse baseline. Their presence in the production report indicates that the public deployment does not yet contain every fix from the latest `main` branch.

Deployment follow-up is tracked in [issue #13](https://github.com/Jpelotea/openready/issues/13).

## Manual testing status

Lighthouse includes several audits that require manual verification, including logical focus order, keyboard traps, control affordances, and visual order. Automated scores therefore do not establish complete accessibility conformance.

The human keyboard, screen-reader, zoom, reflow, theme, reduced-motion, and real-device review is tracked in [issue #14](https://github.com/Jpelotea/openready/issues/14) and described in [manual-accessibility-testing.md](manual-accessibility-testing.md).

## Next production baseline

After the latest `main` branch is deployed:

1. rerun the `Production deployment audit` workflow
2. confirm the four stale-deployment findings are absent
3. record the new category scores and key performance metrics
4. compare local and production results without presenting them as interchangeable
5. create focused issues for any remaining production-only problems

The local GitHub Actions baseline and production Netlify baseline must remain clearly distinguished in project documentation.
