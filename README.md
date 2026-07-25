# OpenReady

OpenReady is a free, non-commercial open-source web application that helps maintainers assess and improve the public health of software repositories.

It turns repository best practices into a practical browser-based checklist covering:

- licensing
- project documentation
- contributor guidance
- Code of Conduct
- security policy
- governance
- changelog and roadmap
- community participation

OpenReady runs entirely in the browser. It has no backend, account system, analytics, advertising, or paid services.

## Live application

https://capable-chaja-458cb0.netlify.app/

## Current version

**v0.2.1 — Data and theming foundation**

Current capabilities:

- interactive repository-health checklist
- automatic progress score
- local browser saving with `localStorage`
- project notes
- JSON export and import
- print-friendly readiness report
- responsive layouts for mobile, tablet, desktop, and wide displays
- system-aware light and dark modes
- saved manual theme preference
- configuration-driven color tokens
- lightweight native browser animations
- reduced-motion support
- JSON-driven checklist and site content

## Who it is for

OpenReady is designed for:

- first-time open-source maintainers
- small community software projects
- contributors helping improve repository documentation
- educators introducing healthy open-source practices
- project owners preparing a public release

## Privacy

OpenReady does not send checklist information to a server. Progress and notes remain in the current browser unless the user intentionally exports a JSON backup.

## Data-driven architecture

Frequently updated content is separated from the core application code:

- `data/checklist.json` contains checklist categories, titles, descriptions, and resource links.
- `data/site.json` contains the version, project links, feature cards, documentation cards, roadmap entries, and theme tokens.

This allows maintainers to update most visible content without editing `app.js` or the main HTML structure.

Important headings and project descriptions remain in semantic HTML as a search-friendly fallback.

## Customizing colors

Open `data/site.json`, then edit the values inside:

```json
"themes": {
  "light": {
    "primary": "#2857d6",
    "background": "#f5f7fb"
  },
  "dark": {
    "primary": "#82a8ff",
    "background": "#07111f"
  }
}
```

The application maps these values to centralized CSS custom properties. When changing colors, review text contrast and interactive states in both themes.

## Repository structure

```text
openready/
├── data/
│   ├── checklist.json        # Checklist content and resource links
│   └── site.json             # Site content, links, version, and themes
├── index.html                # Semantic page structure and SEO fallback content
├── styles.css                # Responsive design system and theme styles
├── app.js                    # Rendering, storage, import/export, theme, and animation logic
├── getting-started.md
├── maintainer-guide.md
├── roadmap.md
├── netlify-open-source-readiness.md
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── netlify.toml
└── README.md
```

## Run locally

No package installation or build process is required. Because the application loads JSON files with `fetch`, use a local web server rather than opening `index.html` directly as a `file://` page.

1. Download or clone the repository.
2. Open a terminal in the repository directory.
3. Start a local server:

```bash
python -m http.server 8080
```

4. Open:

```text
http://localhost:8080
```

Other static servers may also be used.

## Deploying

OpenReady is a static site. Netlify can publish it directly from the repository root.

Recommended settings:

```text
Build command: leave blank
Publish directory: .
```

The included `netlify.toml` contains the publish configuration.

## Performance and accessibility goals

OpenReady aims to maintain:

- Lighthouse Performance score of 90 or higher
- Lighthouse Accessibility score of 95 or higher
- Lighthouse Best Practices score of 95 or higher
- Lighthouse SEO score of 95 or higher
- minimal layout shifting
- no required third-party JavaScript
- keyboard-accessible controls
- visible focus indicators
- support for `prefers-reduced-motion`

These are project targets rather than guarantees because results vary by browser, device, network, and hosting conditions.

## Project roadmap

See [roadmap.md](roadmap.md) and the current [v0.3.0 roadmap tracker](https://github.com/Jpelotea/openready/issues/8).

Current open work includes:

- expanding checklist guidance and examples
- adding README screenshots
- refining mobile usability
- creating a dedicated accessibility review checklist
- exploring optional project profiles and scoring

## Contributing

Beginner-friendly contributions are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md), browse the [issue tracker](https://github.com/Jpelotea/openready/issues), or join [GitHub Discussions](https://github.com/Jpelotea/openready/discussions).

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please review [SECURITY.md](SECURITY.md) before reporting a sensitive issue.

## Non-commercial statement

OpenReady is a non-commercial open-source software project. It does not sell hosting, consulting, premium support, advertising, subscriptions, or paid access.

## License

OpenReady is licensed under the [MIT License](LICENSE).
