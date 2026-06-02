# Deployment

This site is built with Hugo and deployed to GitHub Pages by GitHub Actions.

## Local build

```bash
hugo --minify
```

The generated `public/` directory is ignored and should not be committed.

## Production

- Repository: `ClockWise89/portfolio-homepage`
- Publishing source: GitHub Actions
- Custom domain: `christophervikner.se`
- Domain file: `static/CNAME`

Pushing to `master` runs `.github/workflows/pages.yml`, builds the site with
Hugo, uploads `public/` as a Pages artifact, and deploys it.

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
