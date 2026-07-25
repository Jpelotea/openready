# Performance and Accessibility Auditing

OpenReady uses Lighthouse CI to measure the quality of the static browser application in a repeatable environment.

## What is measured

The audit records these Lighthouse categories:

- Performance
- Accessibility
- Best Practices
- SEO

It also preserves the full HTML and JSON Lighthouse reports as a GitHub Actions artifact for 30 days.

## Current targets

The following values are project targets rather than guarantees across every browser, device, network, or hosting environment:

- Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 95 or higher
- SEO: 95 or higher

The initial workflow treats these thresholds as warnings while the project gathers more results. Stable thresholds may become blocking after multiple audits confirm that normal run-to-run variation is understood.

## Initial measured baseline

Audit date: July 25, 2026  
Commit: `7ad08d37b61d0a2cfe889642baf95c53939e44ff`  
Environment: GitHub Actions, Ubuntu runner, Node.js 22, Lighthouse CI `0.15.x`  
Target: repository served locally through Lighthouse CI's static server  
Runs: 3

Representative Lighthouse scores:

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

All three runs reported 100 in all four categories after accessibility labels and the missing favicon were fixed.

An earlier audit on the same pull request measured 100 Performance, 91 Accessibility, 96 Best Practices, and 100 SEO in its representative run. That report identified three accessibility naming or labeling problems and a missing favicon request. The findings were corrected before recording the baseline above.

### Limitations

- These scores describe the local static build in GitHub Actions, not the currently deployed Netlify site.
- Lighthouse scores can vary with browser versions, runner load, throttling, network conditions, and deployment behavior.
- A perfect category score does not prove that the application has no accessibility, usability, security, or performance problems.
- Manual keyboard, screen-reader, responsive-layout, and real-device checks remain necessary.

## Run locally

Run Lighthouse CI from the repository root:

```bash
npx --yes @lhci/cli@0.15.x autorun
```

The configuration in `lighthouserc.json` serves the repository as a static site, runs three audits, and writes reports to `lhci-results/`.

## Run in GitHub Actions

The `Lighthouse audit` workflow runs for relevant changes to the application, JSON content, audit configuration, performance documentation, or workflow itself. It can also be started manually from the Actions tab.

After a run:

1. Open the completed `Lighthouse audit` workflow.
2. Download the `lighthouse-reports` artifact.
3. Open `manifest.json` for category summaries.
4. Open the representative HTML report for detailed opportunities and diagnostics.

## Recording future baselines

A future baseline record should include:

- audit date
- commit SHA
- whether the audit used the local static build or deployed site
- representative category scores
- material limitations
- follow-up issues for high-impact findings

Do not describe target scores as measured results unless a completed report supports the claim.
