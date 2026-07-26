# Threat Model

This document records a lightweight security model for OpenReady. It is intended to guide design, review, testing, and incident response. It does not claim that the software is free from vulnerabilities.

## System summary

OpenReady is a static browser application hosted from a public GitHub repository and deployed to Netlify.

The application:

- has no backend application server
- has no account or authentication system
- has no project database
- stores checklist, profile, theme, and notes data in the current browser
- imports and exports user-selected JSON files
- prints reports through the browser
- loads project-controlled JSON configuration and documentation links

## Security goals

OpenReady should:

1. Avoid executing imported or user-entered content as code.
2. Keep project-profile, checklist, and notes data on the user's device unless the user intentionally exports or prints it.
3. Preserve the integrity of repository code, GitHub Actions, releases, and production deployments.
4. Avoid misleading users about security, accessibility, legal compliance, or hosting-program eligibility.
5. Provide a private route for sensitive vulnerability reporting.
6. Fail clearly and safely when imported data is malformed or unsupported.

## Assets

Important assets include:

- checklist and project-profile data in browser storage
- imported and exported JSON files
- project notes
- the integrity of OpenReady source code
- release tags and release notes
- GitHub Actions workflows and artifacts
- Netlify production deployments
- documentation and external resource links
- maintainer credentials and repository permissions
- project reputation and user trust

## Trust boundaries

OpenReady crosses the following trust boundaries:

- user-controlled text entered into forms
- user-selected JSON imported from local storage
- browser local storage
- project JSON loaded with `fetch`
- project-controlled HTML, JavaScript, CSS, and SVG
- third-party links opened by users
- GitHub contributors and pull requests
- GitHub Actions and third-party actions
- Netlify build and deployment infrastructure
- maintainer email used for private reports

## Threats and mitigations

| Area | Threat or misuse case | Current mitigation | Residual risk and future work |
|---|---|---|---|
| User text | Script or markup injection through project names, notes, or evidence | Application rendering uses safe DOM APIs and text content rather than inserting user input as HTML | Continue regression testing and review any future rich-text feature carefully |
| JSON import | Malformed, oversized, deceptive, or unexpected JSON causes crashes, data loss, or unsafe behavior | Imports are user initiated; expected fields are normalized; existing tests cover supported formats | Add explicit size limits, schema validation, unknown-field reporting, and safe migration in schema v2 |
| Browser storage | Another person using the same browser profile can view locally stored project information | The UI states that data stays in the current browser and reset clears the workspace | Users should avoid entering sensitive information on shared devices; consider clearer privacy warnings |
| Exported files | Exported JSON or printed reports may be shared with unintended recipients | Export and print actions are explicit user choices | Add guidance that exported files may contain project names, links, notes, and review information |
| External links | A linked resource changes ownership, becomes misleading, or contains harmful content | Project links use complete URLs and are reviewed through data validation | Periodic link review is still required; external sites remain outside OpenReady's control |
| Project configuration | Compromised JSON changes checklist content, links, themes, or roadmap information | Public review, validation workflow, stable IDs, and version control | Default-branch protection and required checks should be reviewed in repository settings |
| Source changes | Malicious or accidental code change introduces unsafe behavior | Pull requests, public history, browser tests, JSON validation, and maintainership review | Repository access and branch protection remain important; small-project review capacity is limited |
| GitHub Actions | Compromised third-party action or workflow permission alters code, artifacts, or releases | Workflows use named actions and explicit permissions where defined | Pin high-risk actions more strictly and review workflow permissions when automation expands |
| Release process | Incorrect tag or release points to the wrong commit | Release documentation policy and manual commit verification | Future automation should verify version metadata, tag, release notes, and deployment commit alignment |
| Netlify deployment | Production content does not match reviewed `main` or is modified through account compromise | Deploys are linked to the public repository and can be checked against commit references | Protect GitHub and Netlify accounts with strong authentication and review unexpected deploys |
| Maintainer credentials | Account or email compromise enables repository, deployment, or disclosure abuse | GitHub and service-provider account controls | Use multi-factor authentication and least-privilege access; document recovery and ownership transfer |
| Sensitive reports | Vulnerability details are disclosed publicly or sent to an unavailable contact | `SECURITY.md` directs reports to a private email route | Enable and document private vulnerability reporting when available; add an approved backup contact later |
| Misleading claims | Users treat a checklist score as certification or guaranteed program eligibility | Documentation states that OpenReady is educational and non-certifying | Repeat disclaimers near future scoring and guided-material features |

## Abuse cases outside the security boundary

OpenReady cannot guarantee the quality, legality, security, accessibility, or governance of a third-party project merely because its maintainer completes a checklist.

The following remain the responsibility of the evaluated project:

- selecting and applying an appropriate license
- protecting repository and deployment accounts
- verifying dependencies and third-party assets
- responding to vulnerabilities and conduct reports
- testing with relevant users and assistive technologies
- satisfying laws, contracts, organizational policies, or hosting-program requirements

## Security assumptions

The current design assumes:

- the user is running a supported modern browser
- the browser and operating system are not already compromised
- the repository and deployment accounts remain under authorized control
- users do not import files from untrusted sources without review
- external links may change and must not be treated as permanently trusted

## Review triggers

This threat model should be reviewed when OpenReady adds or changes:

- import or export formats
- rich text or HTML rendering
- external APIs
- accounts, authentication, or cloud storage
- third-party JavaScript dependencies
- GitHub Actions permissions
- release automation
- Netlify functions, edge functions, forms, or databases
- collaboration or shared-project features

It should also be reviewed after a security incident or a meaningful change in the application's trust boundaries.

## Reporting concerns

Use the private process in [SECURITY.md](SECURITY.md) for exploitable or sensitive concerns. General threat-model improvements that do not expose a vulnerability may be proposed through a public issue or pull request.