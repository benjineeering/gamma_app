# NHI Tools

Web-based tools and documentation from [North Harbour Instruments](https://app.northharbourinstruments.com).

## Structure

```
├── geiger/       → Pulse Counter PWA (PGD-17 companion app)
├── docs_src/     → MkDocs Material documentation source
├── assets/       → Shared assets (logos, images)
├── index.html    → Landing page
└── .github/      → GitHub Actions deployment workflow
```

## Pulse Counter

An offline-capable Progressive Web App that listens for audio pulses from the PGD-17 Geiger counter and displays real-time CPS, CPM, and total count readings.

**Key features:**
- Installable on iPhone and Android
- Works fully offline after first load
- Cascaded 4th-order bandpass filter with envelope detection
- Adjustable sensitivity, center frequency, and bandwidth
- No data stored or transmitted

**Live app:** [app.northharbourinstruments.com/geiger/](https://app.northharbourinstruments.com/geiger/)

## Documentation

Built with [MkDocs Material](https://squidfun.github.io/mkdocs-material/). Source files are in `docs_src/`.

**Live docs:** [app.northharbourinstruments.com/docs/](https://app.northharbourinstruments.com/docs/)

## Deployment

The site is deployed to GitHub Pages via GitHub Actions. The workflow in `.github/workflows/deploy.yml`:

1. Builds MkDocs documentation from `docs_src/`
2. Assembles the full static site (landing page + Pulse Counter + docs)
3. Deploys to GitHub Pages

Pushes to `master` trigger automatic deployment.

## License

© North Harbour Instruments
