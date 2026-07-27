# Project Health Metrics

OpenReady uses a small set of repository and project-operation measurements to support decisions about documentation, contributor experience, accessibility, maintenance load, and releases.

These measurements are not a score, certification, popularity contest, service-level agreement, or requirement for constant maintainer activity.

## Privacy principles

OpenReady does not add embedded website analytics, tracking pixels, advertising measurement, session recording, fingerprinting, or user-profile analytics.

The project does not receive checklist statuses, project-profile values, notes, evidence links, responsible-person fields, review dates, or guided-material drafts from the browser application.

Metrics are limited to:

- public or maintainer-visible aggregate GitHub repository activity
- project-controlled issue, pull-request, release, workflow, roadmap, and accessibility records
- voluntarily provided contributor information already shared through public project participation

Do not copy private security, conduct, accessibility, or personal information into a metrics snapshot.

## Review cadence

A metrics snapshot may be prepared:

- once per calendar month when it supports a decision
- before or after a significant release
- during a project-health review

A missing monthly snapshot is not a project failure. Maintainer health, safety, family, employment, and other responsibilities take priority over measurement cadence.

Unless a snapshot says otherwise, use calendar dates in UTC and an inclusive date range.

## Core measurements

### 1. Issues opened

**Definition:** Public GitHub issues created during the reporting period, excluding pull requests.

**Reproducible query:**

```text
repo:Jpelotea/openready is:issue created:START_DATE..END_DATE
```

**Decision supported:** Whether incoming reports are increasing and whether issue templates or documentation should be improved.

### 2. Issues closed

**Definition:** Public GitHub issues closed during the reporting period.

**Reproducible query:**

```text
repo:Jpelotea/openready is:issue closed:START_DATE..END_DATE
```

**Decision supported:** Whether accepted work is being resolved, deferred, duplicated, or closed as out of scope.

The number must be interpreted with closure reasons. Closing many issues is not automatically better.

### 3. Open issue backlog

**Definition:** Public issues still open at the snapshot date.

**Reproducible query:**

```text
repo:Jpelotea/openready is:issue is:open
```

**Decision supported:** Whether current scope is manageable and whether roadmap work should be narrowed or deferred.

### 4. Pull requests opened and merged

**Definitions:**

- **Opened:** Pull requests created during the period.
- **Merged:** Pull requests merged during the period.

**Reproducible queries:**

```text
repo:Jpelotea/openready is:pr created:START_DATE..END_DATE
repo:Jpelotea/openready is:pr is:merged merged:START_DATE..END_DATE
```

**Decision supported:** Whether contribution and review activity is moving through the project without treating volume as a target.

### 5. First-time contributors

**Definition:** A person whose first accepted public contribution to OpenReady occurred during the period. An accepted contribution may be a merged pull request or a clearly credited issue report, accessibility test, documentation contribution, or other contribution recorded in release notes.

**Reproduction method:**

1. Review merged pull requests and release-note acknowledgements in the period.
2. For each contributor, search their earlier repository participation.
3. Count the contributor as first-time only when no earlier accepted contribution is found.
4. Record the evidence link in the snapshot.

**Decision supported:** Whether first-contribution pathways are understandable and usable.

Because issue comments and informal help can be difficult to classify consistently, snapshots must state the evidence used rather than claiming a perfect count.

### 6. Returning contributors

**Definition:** Contributors with an accepted contribution in the reporting period and at least one accepted contribution before the period.

**Reproduction method:** Use the same evidence process as first-time contributors and record the prior contribution link.

**Decision supported:** Whether people can participate more than once without requiring a maintainer role.

### 7. Contribution mix

**Definition:** Accepted contributions grouped by primary type:

- documentation
- accessibility
- testing
- issue reporting or triage
- design
- code
- community support

A contribution may be recorded in more than one type when necessary, but the snapshot should explain the classification method.

**Decision supported:** Whether OpenReady recognizes the work needed beyond code.

### 8. Maintainer acknowledgement time

**Definition:** Elapsed time from creation of a clear public issue or pull request to the first substantive maintainer response.

Automated notifications, label changes without explanation, bot messages, and the author's own follow-up do not count as substantive responses.

**Reproduction method:**

1. List clear public issues and pull requests created during the period.
2. Record creation time and first substantive maintainer response time.
3. Calculate the median for the sample.
4. State exclusions and sample size.

**Decision supported:** Whether documentation, triage routines, or maintainer-capacity notices need adjustment.

This is not an SLA and must not be used to pressure the maintainer into constant availability.

### 9. Accessibility work

Record:

- accessibility reports opened
- accessibility defects resolved
- human test sessions documented
- testing environments completed
- known manual-testing gaps remaining

Use the accessibility issue form, linked issue records, and `docs/manual-accessibility-testing.md` as evidence.

**Decision supported:** Which barriers and human-testing gaps should be prioritized next.

Automated accessibility or Lighthouse scores are supporting evidence, not accessibility certification.

### 10. Release and roadmap outcomes

Record:

- releases published during the period
- roadmap items completed
- roadmap items deferred
- roadmap items cancelled or closed as not planned
- release-gate checks still incomplete

**Decision supported:** Whether release scope remains realistic and whether shipped work is clearly distinguished from plans.

### 11. Workflow health

For a release commit or major pull request, record whether relevant project workflows completed successfully, failed, or were not triggered.

Current workflow areas include:

- project-data and guidance validation
- browser and accessibility regression checks
- local Lighthouse audits
- production Lighthouse audits when intentionally run

**Decision supported:** Whether automation is reliable and whether failures need product, test, or workflow changes.

Do not report a workflow as passing unless its result has been verified.

## Optional awareness indicators

Repository stars, forks, views, unique visitors, clones, and referrals may be recorded when aggregate data is available and useful.

They are awareness indicators only. They do not establish:

- software quality
- repository health
- community safety
- accessibility
- security
- legal compliance
- maintainer sustainability
- Netlify Open Source Plan eligibility

OpenReady does not set growth targets for these indicators.

## Measurements intentionally excluded

OpenReady does not collect or publish:

- individual checklist or project-profile behavior
- user identities inferred from website visits
- sensitive security or conduct-report details
- private accessibility information
- contributor activity quotas
- maintainer productivity targets
- funding, donation, sponsorship, revenue, conversion, sales, paid-support, or other commercial metrics

## Interpretation rules

Every snapshot should:

- identify the reporting period and time zone
- link to reproducible evidence where safe
- state exclusions and missing data
- distinguish counts from conclusions
- explain at least one decision the measurement may support
- avoid comparisons that shame contributors or maintainers
- avoid presenting activity as proof of project health

A number without context should not be used as a project claim.

## Snapshot process

1. Copy [`docs/metrics-snapshot-template.md`](docs/metrics-snapshot-template.md).
2. Name the file using the period, such as `docs/metrics/2026-08.md`, when a snapshot is intentionally retained.
3. Run the documented GitHub searches and record the date performed.
4. Add evidence links and limitations.
5. Record decisions or follow-up issues created from the review.
6. Review the snapshot for private or sensitive information before committing it.

Snapshots should be reviewed through a pull request when practical.

## Relationship to OpenReady assessments

The OpenReady assessment item for project metrics may be marked complete when a project has documented goal-linked measurements, privacy limits, interpretation guidance, and a sustainable review process.

A project does not need website analytics, high popularity, or continuous monthly reporting to complete that item.