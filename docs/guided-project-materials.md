# Guided project materials

OpenReady v0.4.0 expands every project-health assessment item with practical guidance and provides editable Markdown starters for common project documents.

The feature is designed to help maintainers turn an assessment finding into a focused next action. It does not create compliance, certification, legal advice, a security assessment, or a hosting-program decision.

## Item guidance

Every core-readiness and operational-maturity item includes:

- why the item matters
- a minimum implementation
- a stronger implementation
- common mistakes
- example evidence
- further resource links

Guidance appears in an expandable **How to improve this item** section inside the related assessment card.

The content is maintained separately from scoring and status logic:

- `data/guidance-core.json`
- `data/guidance-maturity.json`

Keeping guidance separate allows wording and educational resources to improve without changing assessment IDs, storage, scoring, or import compatibility.

## Safety notices

Three notices appear above the assessment:

1. **General information, not legal advice**
2. **Planning guidance, not a security assessment**
3. **Guidance, not accessibility certification**

These notices supplement the main score disclaimer. A high OpenReady score does not prove that evidence is accurate, current, legally sufficient, accessible, secure, compliant, or accepted by Netlify or another third party.

## Editable starters

Ten starter materials are stored in `data/materials.json`:

1. README planning worksheet
2. Accessibility statement starter
3. Security policy review worksheet
4. Threat model outline
5. Incident-response checklist
6. Governance roles worksheet
7. Support boundaries starter
8. Conduct enforcement worksheet
9. Privacy-respecting metrics plan
10. License and third-party material review

Each starter includes:

- a purpose statement
- a specific limitation or disclaimer
- editable Markdown with bracketed prompts
- a suggested `.md` filename

A relevant starter appears inside the related checklist guidance. Some starters may support more than one item; control IDs include both the starter and assessment item IDs so labels remain unique.

## Using a starter

1. Expand **How to improve this item**.
2. Review the minimum, stronger, mistake, evidence, and resource sections.
3. Edit the starter text in the textarea.
4. Replace every bracketed prompt with project-specific information.
5. Remove sections that do not apply.
6. Use **Copy starter** or **Download Markdown**.
7. Review the final document before committing it to a repository.

**Restore starter** replaces the current textarea value with the original starting text.

## Privacy and persistence

Starter edits:

- stay on the current page until copied or downloaded
- are not sent to OpenReady, GitHub, or Netlify
- are not included in assessment scoring
- are not included in the JSON assessment export
- are not automatically saved to browser storage

This avoids silently adding draft policy or security content to a report. Maintainers should copy or download useful work before refreshing or leaving the page.

Do not place passwords, tokens, confidential vulnerability reports, private conduct reports, medical details, or unnecessary personal information in starter text.

## Print behavior

Before printing, OpenReady temporarily expands all guidance sections so guidance and starter text can appear in the browser-generated report. The previous expanded or collapsed state is restored after printing.

Action buttons and temporary privacy notes are hidden in print output.

## Content validation

`scripts/validate_guidance.py` checks that:

- the legal, security, and accessibility notices exist
- every current checklist ID has one guidance record
- guidance does not exist for unknown checklist IDs
- required explanation arrays contain text
- every guidance record includes at least one valid HTTP or HTTPS resource
- referenced starter IDs exist
- starter IDs are unique and use kebab case
- every required starter exists
- starter filenames end in `.md`
- starter descriptions, disclaimers, and content are non-empty
- funding or commercial starter IDs are not introduced

The validation workflow runs both:

```text
python scripts/validate_data.py
python scripts/validate_guidance.py
```

## Browser verification

Playwright coverage verifies:

- all 22 assessment items receive structured guidance
- all three notices appear
- every guidance section has the required headings
- starter text is editable
- Markdown downloads preserve edited text
- starter restoration works
- repeated starters use unique control IDs
- keyboard users can open guidance and reach an editable starter
- print preparation expands and restores guidance
- expanded guidance does not create horizontal page overflow at 320 pixels

Automated tests do not replace content review, manual accessibility testing, security review, or legal review.

## Content maintenance

When a checklist item is added or removed:

1. Update `data/checklist.json`.
2. Add or remove the matching guidance record.
3. Add a starter only when it provides a useful editable next step.
4. Keep resource links directly related to the item.
5. Run both validators.
6. Run the browser test suite.
7. Review the content in light and dark themes and on a narrow viewport.

## Explicitly out of scope

Guided materials do not include:

- funding guidance
- donation or sponsorship setup
- crowdfunding
- pricing or subscriptions
- premium features
- paid support
- consulting or implementation offers
- hosting services
- advertising or affiliate material
- automatic compliance declarations
- automatic Netlify eligibility conclusions

OpenReady remains a free, non-commercial, MIT-licensed project focused on open-source software and its community.
