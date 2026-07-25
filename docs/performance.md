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

The initial workflow treats these thresholds as warnings while the project establishes a trustworthy baseline. A future change may make stable thresholds blocking after the results have been reviewed over multiple runs.

## Run locally

Install and run Lighthouse CI from the repository root:

```bash
npx --yes @lhci/cli@0.15.x autorun
```

The configuration in `lighthouserc.json` serves the repository as a static site, runs three audits, and writes reports to `lhci-results/`.

## Run in GitHub Actions

The `Lighthouse audit` workflow runs for relevant changes to the application, JSON content, audit configuration, or workflow itself. It can also be started manually from the Actions tab.

After a run:

1. Open the completed `Lighthouse audit` workflow.
2. Download the `lighthouse-reports` artifact.
3. Open `manifest.json` for category summaries.
4. Open the representative HTML report for detailed opportunities and diagnostics.

## Recording a baseline

A baseline record should include:

- audit date
- commit SHA
- whether the audit used the local static build or deployed site
- representative category scores
- material limitations
- follow-up issues for high-impact findings

Do not describe target scores as measured results until a completed report supports the claim.
