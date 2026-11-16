# T-006 CV And Portfolio Content

- Ticket: portfolio-homepage/T-006, verified active in PRJ-2026-004; no roster assignment gate.
- Authorization: apply the T-005 proposed content/navigation fixes, clarify New Minds placement at HiQ and concurrent after-work CYBM, refine only requested CV spacing/technology labels, and publish.
- Base: origin/master f674c49cc8d3b076e1846dd243f51334245c15d7.
- Design: retain Toha 3.8.0, Hugo Extended 0.113.0, colors, assets and page structure; use small repo-local template overrides for usable legacy pages and portfolio navigation.
- Ownership: worker edits data/en and content only. Main owns Overleaf/PDF, layouts/config, tests, integration and publication. Preserve user/live edits and unrelated vault work.
- Routing: standard worker requested Sol/high; runtime requires inherited model unless user requests an override, so actual model is unknown. One independent reviewer requested Sol/xhigh before PR.

## Progress

- [x] Read instructions, inspect clean repo, verify ticket, branch from current origin/master.
- [x] Adjust CV spacing and remove technology labels; compile and inspect all three pages (zero diagnostics).
- [x] Align site copy and timeline with CV plus user clarification.
- [x] Restore legacy page content, expose portfolio, make empty archive routes intentional.
- [x] Run dependency audit (zero vulnerabilities), Hugo build and twelve regression checks with Node 24.22.1. Desktop and 390px phone checks passed for text/image bounds, menus, restored pages, current work, search and redirects.
- [ ] Complete independent review, push/PR, publish review evidence, pass CI and merge.
- [ ] Verify deployed SHA, live content and byte-identical PDF; update vault and clean owned outputs.

## Constraints

Do not invent historical dates. Use the CV role headings for displayed periods, explain New Minds as the placement employer and CYBM as concurrent after-work work. Avoid treating blog publication dates as employment dates. Preserve other CV wording and its overall design. No theme/dependency upgrades, account/security settings changes or unrelated cleanup. The existing username-qualified origin URL blocked T-005 branch retirement; retry only through lifecycle guards and report any remaining block.

## Validation Notes

The approved CV remains three pages with zero LaTeX diagnostics and identical wording except the removed technology labels. SHA256: 883c09b8f05f162c76b6cbe03bc3e8b4514a7ba15bb0b9cccd545a77991fad28. Local validation uses `HUGO_RESOURCEDIR=.worktree/cache/resources` and build destination `.worktree/build/site`; tests accept `SITE_OUTPUT_DIR` and default to `public` in CI. Local template overrides retain the theme while correcting empty section rendering, misleading post dates, card markup/icon fonts, clipped navigation and unused archive destinations. Review/publication status after this pre-PR checkpoint is recorded in review evidence and the canonical vault ticket.
