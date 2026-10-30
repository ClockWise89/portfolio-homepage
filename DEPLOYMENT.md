# Deployment

This site is built with Hugo and deployed to GitHub Pages by GitHub Actions.

## Local build

```bash
hugo --minify
npm test
```

The generated `public/` directory is ignored and should not be committed.

The GitHub Pages workflow pins Hugo Extended `0.113.0`.
Site smoke checks require Node.js 24 (the CI version) or newer.

## Dependency Maintenance

The vendored theme's npm packages are CSS maintenance tools, not dependencies
of the Hugo build. CI still installs and audits their complete locked graph:

```bash
npm ci --prefix themes/toha-3.8.0 --ignore-scripts
npm audit --prefix themes/toha-3.8.0 --audit-level=low
```

Keep the theme lockfile committed. Dependency updates must pass the audit, full
Hugo build, and generated-site smoke checks before merging.

## Production

- Repository: `ClockWise89/portfolio-homepage`
- Publishing source: GitHub Actions
- Custom domain: `christophervikner.se`
- Domain file: `static/CNAME`

Merging into `master` runs `.github/workflows/pages.yml`: dependency validation,
Hugo build, generated-site checks, artifact upload, and production deployment.
PRs targeting `master` run the same validation without uploading or deploying.
Manual runs deploy only when run on `master`.

Build jobs have read-only repository access. Only the production deploy job has
Pages and OIDC write permissions, using the existing `github-pages` environment.
Production runs are serialized without canceling an active deployment; PR runs
have isolated concurrency and cancel superseded runs for the same PR.
`static/CNAME` is copied into the checked artifact; the base URL and custom
domain must remain `https://christophervikner.se/`.
The existing `files/resume.pdf` is mounted at `static/files/resume.pdf` so its
homepage download link is included in every deployment without changing the PDF.

## GitHub setup

In the repository settings:

1. Open `Settings -> Pages`.
2. Set the source to `GitHub Actions`.
3. Set the custom domain to `christophervikner.se`.
4. Enable `Enforce HTTPS` when GitHub allows it.

## DNS setup

For the apex domain `christophervikner.se`, add GitHub Pages `A` records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally add a `www` CNAME:

```text
www -> ClockWise89.github.io
```

DNS changes can take time to propagate. Do not cancel the old hosting until the
GitHub Pages deployment works over HTTPS on the custom domain.
