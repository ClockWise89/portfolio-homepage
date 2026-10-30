# T-004: Secure Dependencies And Verify Production Deployment

## Authorization And Scope

The user explicitly authorized unattended implementation, bounded CI, commit/push,
and merge/deployment of reviewed pipeline and security fixes (2026-10-31). This
replaces a separate manual plan-approval wait for this scope. No credentials,
portfolio content, design, unrelated repositories, or vault files will be changed.

## Baseline

- Production: `master`, `666a54efaaa7906f42a635b2f9f4fe81158d7730`.
- PR #3 / T-002 was already merged; its historical branch remains untouched.
- GitHub Pages API confirms workflow publishing, `master` source, HTTPS enforced,
  and custom domain `christophervikner.se`. No new `develop` or default changes.
- Active vendored theme is Toha 3.8.0; Hugo Extended 0.113.0 is intentional.
- Four open alerts affect PostCSS, Browserslist, and source-map-js in the theme
  lockfile. The theme's npm tools are maintenance dependencies, not Hugo's build.
- Vault T-004 is active and parent-owned. T-001/T-003 are archived; T-002 still
  refers to the historical audit. Vault reads only; parent owns reconciliation.

## Design And Steps

1. Preserve the existing portfolio and Hugo/theme versions. Update only the
   vulnerable dependency graph within supported ranges; retain lockfile v2.
2. Keep PR validation read-only and non-publishing. Install and audit the locked
   theme tools, build the full site, and check output/domain/assets. Restrict
   Pages/OIDC writes to production deployment, with isolated PR concurrency.
3. Validate locally and run one bounded independent review of exact base/head
   commits before PR creation. Resolve blockers and publish review evidence.
4. Push/open PR, verify PR CI skips deployment, then merge the reviewed scope.
5. Verify the merge-triggered Pages run, deployed SHA, live HTTPS domain/assets,
   and Dependabot alert closure. Keep verbose logs in `/private/tmp`.

## Validation

- Clean `npm ci`, complete `npm audit`, package graph/version checks.
- Hugo full build with pinned version; output validation and representative
  pages, styles/scripts/images, search JSON, sitemap, and exact CNAME checks.
- Workflow validation and diff checks; actual PR CI and production deployment.
- Final report: SHAs, PR/run URLs, counts, alert states, remaining blockers.

## Progress

- [x] Inspect baseline, PR history, hosting, alerts, and read-only vault context.
- [x] Implement targeted dependency and workflow changes.
- [ ] Complete local validation and independent review.
- [ ] Open PR, pass CI, merge, and verify real deployment/alert state.

## Findings And Decisions

- Updated graph: PostCSS 8.5.32, Browserslist 4.29.5, source-map-js 1.2.2,
  with only their required supporting dependency updates. `npm ci` and the
  complete npm audit pass (89 audited packages, zero vulnerabilities).
- Generated-site validation found the existing resume link returned HTTP 404
  in production because `files/resume.pdf` was not a Hugo static resource.
  A narrow static mount publishes only that unchanged PDF and retains normal
  static files. This is a publishing fix, not a portfolio-content edit.
- Removed unused configure-pages metadata setup; Pages is already configured
  for workflow publishing. Build needs only contents read; deploy alone gets
  Pages/OIDC writes. Third-party actions are pinned to verified commit SHAs.
- Local validation: pinned Hugo full build succeeds (50 pages, 1,036 static
  files); seven smoke tests pass; actionlint and diff whitespace checks pass.
  Compared against a separately archived/built production baseline: generated
  output is byte-identical except the newly published, unchanged resume PDF.
