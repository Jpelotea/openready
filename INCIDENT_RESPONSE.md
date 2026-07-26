# Incident Response

This document describes how OpenReady handles suspected security incidents affecting the source repository, browser application, release process, or production deployment.

It is a lightweight process for a small open-source project and does not replace a professional incident-response program.

## What counts as an incident

An incident may include:

- exploitable behavior in the browser application
- unsafe handling of imported JSON or user-entered content
- unauthorized changes to source code, workflows, tags, or releases
- a compromised maintainer, GitHub, email, or Netlify account
- an unexpected or malicious production deployment
- disclosure of a confidential vulnerability report
- a harmful external link controlled by project configuration
- evidence that users were materially misled about a security-sensitive behavior

Routine bugs without security impact should use the public issue tracker.

## Reporting

Follow [SECURITY.md](SECURITY.md) for private vulnerability reporting.

Do not publish exploit details, credentials, private reporter information, or an unpatched reproduction in a public issue or discussion.

## Response roles

The current maintainer coordinates incident response. When a report involves the maintainer's account, conduct, or conflict of interest, the project should seek help from a trusted independent reviewer before making disclosure or enforcement decisions.

No backup contact is listed until a person has explicitly agreed to that role.

## Response stages

### 1. Receive and acknowledge

- Preserve the original report and relevant timestamps.
- Confirm receipt without promising a specific outcome.
- Ask only for information needed to reproduce and assess the issue.
- Avoid requesting secrets or unnecessary personal data.

The project aims to acknowledge a clear sensitive report within five business days, subject to maintainer availability.

### 2. Triage

Determine:

- whether the report affects OpenReady
- whether the issue is reproducible
- which versions, branches, or deployments are affected
- whether exploitation is known or likely
- whether user data, repository integrity, or account access is at risk
- whether the report should remain private

A practical severity guide:

- **Critical:** active compromise, unauthorized release or deployment control, or a reliable path to execute attacker-controlled code
- **High:** serious integrity, confidentiality, or availability impact with plausible exploitation
- **Moderate:** meaningful security weakness with limited impact or important preconditions
- **Low:** hardening opportunity, defense-in-depth improvement, or low-impact information exposure

Severity may change as evidence develops.

### 3. Contain

Containment may include:

- disabling or reverting a production deployment
- rotating credentials or revoking sessions
- reducing workflow permissions
- temporarily disabling an affected feature
- restricting repository access
- removing or replacing a harmful external link
- preserving logs, commit references, artifacts, and screenshots

Containment changes should be as small and reversible as practical.

### 4. Remediate

- Prepare the smallest safe fix.
- Add regression coverage when feasible.
- Review related code and trust boundaries for similar weaknesses.
- Update the threat model or policies when the incident reveals a missing assumption.
- Avoid exposing the fix publicly before affected users have a reasonable opportunity to update when coordinated disclosure is necessary.

### 5. Verify

Verification should include the checks relevant to the incident, such as:

- browser regression tests
- JSON validation
- import and export tests
- manual reproduction of the original report
- repository and workflow permission review
- release-tag and deployment-commit comparison
- production smoke testing

Passing automated tests does not by itself prove that all related risk has been removed.

### 6. Release and disclose

When a security fix requires a release:

- publish the fix from the reviewed commit
- update supported-version information if needed
- record the release and affected versions
- describe impact and remediation without publishing unnecessary exploit detail
- credit the reporter when permission is granted
- notify users through the repository, release notes, or another channel appropriate to the impact

Disclosure timing should balance user protection, transparency, and the reporter's reasonable expectations.

### 7. Learn and follow up

After a meaningful incident:

- document what happened and which controls helped or failed
- create focused follow-up issues
- update `SECURITY.md`, `THREAT_MODEL.md`, workflows, tests, or maintainer procedures
- review whether account recovery, repository access, or deployment controls need improvement
- close private reports only after the reporter receives a final status when contact remains available

## Evidence handling

Incident material should be limited to people who need it for triage and remediation.

Avoid copying sensitive details into public issues, pull requests, commit messages, or workflow logs. Redact credentials, personal information, and exploit material from public documentation.

## Communication principles

Incident communication should be:

- factual
- proportionate to confirmed impact
- clear about uncertainty
- free of unsupported claims
- respectful toward reporters and contributors
- explicit about affected versions and required action

OpenReady will not claim that a checklist, audit score, or policy document guarantees security.

## Service limitations

OpenReady has no paid incident-response service, emergency support contract, or guaranteed response time. The maintainer may request outside technical help when an incident exceeds current expertise or availability.