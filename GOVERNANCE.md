# Governance

OpenReady uses a maintainer-led governance model designed for a small, early-stage open-source project.

The current maintainer is Joshua Carl Pelotea. Community contributors may participate through issues, discussions, testing, documentation, design, code, accessibility review, security review, and other work that supports the software.

This document explains roles, decisions, permissions, conflicts, continuity, and how governance may grow. It does not create an employment, partnership, agency, or compensation relationship.

## Governance principles

Project decisions should support:

- the purpose and users of OpenReady
- simplicity for beginner maintainers
- accessibility and inclusive participation
- security, privacy, and safe data handling
- backward compatibility where practical
- maintainable and reviewable changes
- transparent public reasoning except when privacy or security requires confidentiality
- sustainable maintainer capacity
- the free, non-commercial open-source mission
- the exact linked Netlify attribution required by the project's hosting commitments

No contributor is entitled to a merge, release, role, permission, or implementation date solely because time or effort was invested.

## Roles

### User

A user runs OpenReady, reads its documentation, or uses its reports without participating in project development.

Users may report problems, ask questions, and suggest improvements.

### Contributor

A contributor makes a useful public contribution, such as:

- a focused issue or reproduction
- documentation or translation work
- accessibility or device-testing evidence
- design feedback
- code or test changes
- issue triage or community support
- a security or privacy improvement

A contribution does not automatically grant repository permissions.

### Regular contributor

A regular contributor participates repeatedly, follows project policies, communicates constructively, and demonstrates reliable understanding of OpenReady's purpose and workflows.

Regular contributors may be invited to help with triage, reviews, documentation ownership, or focused project areas. This role does not automatically include write or administrative access.

### Maintainer

A maintainer may review and merge changes, manage issues and discussions, help moderate community spaces, coordinate releases, and protect project direction.

Maintainers are expected to:

- follow and enforce the Code of Conduct
- disclose conflicts of interest
- use repository access only for project purposes
- protect security and private reports
- keep permissions no broader than needed
- use strong account security, including multi-factor authentication where supported
- communicate decisions respectfully
- avoid unsupported promises or certification claims
- preserve the project's free, non-commercial status

### Security contact

A security contact may receive and help assess private vulnerability reports. The current maintainer performs this role unless another person explicitly agrees to serve.

Security contacts must follow [SECURITY.md](SECURITY.md) and [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md).

### Code of Conduct contact

A Code of Conduct contact may receive private conduct reports and coordinate conflict-safe review.

The current maintainer is the only published contact. No secondary or independent contact will be named without that person's explicit consent. Reports involving the maintainer follow the limitations and interim process in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Decision classes

### Routine maintainer decisions

The maintainer may decide routine matters after appropriate review, including:

- typo and documentation corrections
- small bug fixes
- issue triage and duplicate handling
- test maintenance
- dependency-free interface refinements
- changes that implement an already accepted issue without changing project direction
- release-documentation corrections

Public pull requests should still explain the change and verification.

### Significant public decisions

Significant changes should be proposed through a public issue or discussion before implementation when practical.

Examples include:

- a new checklist data model or scoring method
- breaking import or export changes
- a new storage or privacy boundary
- major interface or navigation redesign
- a new third-party runtime dependency
- changes to governance, the Code of Conduct, security policy, or licensing
- adding accounts, a backend, cloud storage, forms, functions, or external APIs
- changes to the project's free or non-commercial status
- removal or alteration of the linked Netlify attribution
- a release that materially changes OpenReady's purpose

A proposal should explain the problem, affected users, alternatives, risks, compatibility, accessibility, security, maintenance cost, and verification plan.

### Confidential decisions

Security reports, conduct reports, private personal information, and credential-related incidents may require confidential handling.

Only the minimum necessary outcome should be published. Confidentiality must not be used to hide ordinary product decisions or avoid reasonable public accountability.

## Decision process

For significant public decisions, the project should:

1. Define the problem rather than starting with a preferred implementation.
2. Invite relevant evidence and alternatives.
3. Identify accessibility, security, privacy, compatibility, and maintenance effects.
4. Seek reasoned agreement rather than relying only on vote counts.
5. Record the decision and important trade-offs.
6. Create focused implementation issues.
7. Review the result after release when the change is substantial.

The current maintainer makes the final project decision when consensus is not reached. The decision should include a concise public rationale unless confidentiality is required.

Disagreement is allowed. Harassment, pressure, repeated demands after a final decision, or attempts to bypass the Code of Conduct are not.

## Reconsidering a decision

A closed decision may be reconsidered when there is:

- meaningful new evidence
- a newly discovered accessibility, security, privacy, or legal risk
- a change in project constraints
- demonstrated user impact not considered previously
- a practical alternative that materially improves the trade-off

Repetition without new information is not a reason to reopen a decision.

## Repository permissions

Repository access follows least privilege.

Before granting write, maintain, or administrative access, the project should consider:

- sustained constructive participation
- technical or community judgment relevant to the role
- understanding of project policies and non-commercial purpose
- reliable review and communication behavior
- handling of accessibility, security, privacy, and backward compatibility
- willingness to disclose conflicts and protect confidential reports
- account security appropriate to the permission level
- a real project need for the access

Permissions may be limited to a particular responsibility and reviewed later.

New maintainer appointments should normally be announced publicly with the role and scope. Private personal information, account-security details, and conduct or security-case evidence must not be published.

## Conflicts of interest

A participant should disclose a conflict when personal, professional, financial, organizational, or close-relationship interests could reasonably affect a project decision.

When practical, a conflicted maintainer should:

- avoid being the sole reviewer
- seek an independent reviewer
- avoid accessing confidential information not needed for immediate safety or preservation
- document the recusal or limitation without disclosing private details

OpenReady does not currently have funding, sponsorship, paid support, commercial services, or paid governance roles. These are outside the v0.4.0 project scope.

## Inactivity and removal

Inactivity alone is not misconduct. Contributors may pause without explanation.

Repository permissions may be reviewed when:

- a role is no longer needed
- a maintainer is unreachable for an extended period after reasonable private contact
- account security is uncertain
- permissions are repeatedly unused or misused
- project policies are repeatedly or seriously violated
- a conflict makes continued access unsafe

Except during an urgent security or safety event, the affected person should receive notice and a reasonable opportunity to respond.

Permission reduction is a risk and continuity decision, not necessarily a disciplinary finding.

## Temporary absence

A maintainer may reduce activity or take a break.

When practical, an absence note should state:

- the expected period or that the return date is unknown
- whether routine reviews are paused
- which security or serious accessibility channels remain monitored
- whether another trusted person has temporary authority

No temporary delegate will be named or granted access without explicit agreement and appropriate account security.

## Succession and project transfer

If the current maintainer plans to step down, the preferred process is:

1. Announce the transition publicly when safety and privacy allow.
2. Identify qualified willing successors based on the maintainer criteria above.
3. Allow community feedback on the proposed transition.
4. Transfer only the permissions and service access required.
5. Verify repository, release, domain, email, and Netlify ownership or recovery routes.
6. Record the effective maintainer and transfer date.
7. Remove obsolete access after verification.

If no suitable successor is available, the maintainer may:

- reduce the project to maintenance-only status
- pause releases
- archive the repository while preserving history and license information
- invite a recognized community organization to discuss stewardship

Project transfer must not be used to convert OpenReady into a commercial service, remove its open-source license, misrepresent community endorsement, or silently remove required hosting attribution.

## Emergency authority

A maintainer may take immediate, narrowly scoped action to contain:

- active account or deployment compromise
- exposed credentials
- malicious code or links
- serious harassment or personal-information exposure
- an incident that threatens users or repository integrity

Emergency actions should be documented after containment without exposing confidential details. Temporary restrictions should be reviewed once the immediate risk has passed.

## Governance changes

Changes to this document are significant public decisions. They should use a focused issue and pull request, explain the reason for the change, and update related policies when necessary.

As the contributor community grows, OpenReady may add maintainers, delegates, working groups, or clearer area ownership. Growth should follow demonstrated need rather than adding titles without responsibilities.