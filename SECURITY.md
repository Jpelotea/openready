# Security Policy

## Supported versions

OpenReady is a small static browser application. The latest released version and the current `main` branch are the actively supported versions.

Older releases may be reviewed when a report clearly affects them, but fixes are normally delivered in the latest version rather than backported to every historical tag.

## Reporting a vulnerability

Do not create a public issue, discussion, pull request, or workflow log containing exploit details, credentials, private reporter information, or an unpatched reproduction.

Report sensitive concerns privately to:

```text
peloteajoshuacarl0@gmail.com
```

Use a subject such as `OpenReady security report`.

When GitHub private vulnerability reporting is enabled for the repository, that channel may also be used. The project will not claim that it is available until the repository setting has been verified.

A useful report includes:

- a short description of the issue
- affected version, commit, page, or feature
- steps to reproduce the behavior
- potential impact
- relevant browser, operating system, or deployment context
- suggested fix, if known
- whether the report may be credited publicly

Do not send passwords, access tokens, private keys, unnecessary personal information, or data from an unrelated third party.

## Acknowledgement and communication

The project aims to acknowledge a clear sensitive report within five business days, subject to maintainer availability. This is a best-effort target, not a paid service-level agreement.

After acknowledgement, the maintainer may:

- request focused reproduction details
- confirm that the issue is under review
- explain that the report is outside OpenReady's scope
- provide a preliminary severity assessment
- coordinate remediation and disclosure timing

Reporters should receive a final status when contact remains available and the issue has been resolved, accepted as residual risk, or closed as not reproducible or out of scope.

## Scope

OpenReady has no backend application server, project database, account system, payment system, or cloud-saved checklist workspace.

Security-relevant areas include:

- browser handling of project-profile, checklist, and notes data
- local storage behavior
- JSON import, migration, validation, and export
- rendering of user-entered or imported text
- project-controlled external links
- source-code integrity
- GitHub Actions and workflow permissions
- release tags and release artifacts
- Netlify deployment integrity
- maintainer and repository access

Examples that are normally in scope:

- executing attacker-controlled code through imported or entered content
- unsafe parsing that causes meaningful data loss or browser compromise
- unauthorized source, workflow, tag, release, or deployment changes
- disclosure of locally stored information beyond expected browser behavior
- a project-controlled link that has been maliciously replaced
- a security-sensitive claim that materially misrepresents actual behavior

Examples that are normally out of scope:

- vulnerabilities in a user's browser, operating system, GitHub, Netlify, or another third-party service when OpenReady does not control the defect
- reports requiring an already compromised local device without an OpenReady-specific weakness
- denial-of-service claims based only on manually importing extremely large files without demonstrated practical impact
- social-engineering requests for credentials or access
- legal, accessibility, or hosting-program eligibility disagreements without a security impact
- automated scanner output without a reproducible OpenReady-specific finding

## Severity and prioritization

OpenReady uses a practical qualitative assessment:

- **Critical:** active compromise, unauthorized control of releases or deployments, or a reliable path to execute attacker-controlled code
- **High:** serious integrity, confidentiality, or availability impact with plausible exploitation
- **Moderate:** meaningful weakness with limited impact, significant prerequisites, or a reliable defense-in-depth failure
- **Low:** hardening opportunity, low-impact information exposure, or a concern with no demonstrated exploit path

Priority may also consider affected users, ease of exploitation, available workarounds, and whether the issue blocks safe use of a core feature.

## Remediation and coordinated disclosure

When a report is valid, the project will try to:

1. reproduce and understand the issue
2. contain immediate risk when necessary
3. prepare the smallest safe fix
4. add regression coverage when feasible
5. verify the reviewed commit and production deployment
6. publish an updated release when users need a fix
7. disclose affected versions, impact, and required action without unnecessary exploit detail
8. credit the reporter when permission is granted

Disclosure timing should protect users while remaining transparent about confirmed impact and uncertainty.

The full process is documented in [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md).

## Threat model

OpenReady's architecture, trust boundaries, assets, misuse cases, mitigations, assumptions, and review triggers are documented in [THREAT_MODEL.md](THREAT_MODEL.md).

The threat model is a living document and does not guarantee that every vulnerability has been identified.

## Security expectations for contributors

Changes affecting imports, exports, storage, rendering, workflows, links, releases, or deployment should include relevant tests and documentation.

Contributors should:

- avoid inserting user-controlled text as HTML
- use the least workflow permissions required
- avoid committing credentials or private data
- keep third-party actions and dependencies reviewable
- preserve the private reporting route
- update the threat model when a trust boundary changes
- avoid claiming that automated tests or checklist scores prove security

See [CONTRIBUTING.md](CONTRIBUTING.md) for the general review checklist.

## Limitations

OpenReady provides educational project-health guidance. It is not a security certification, penetration-testing service, managed incident-response service, or guarantee of eligibility for any hosting program.