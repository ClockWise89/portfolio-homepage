# Ticket Workflow

1. Inspect status, current instructions, assigned vault ticket, and existing PRs. Preserve nontrivial work before switching branches.
2. Fetch and branch from updated `origin/master`: `<type>/T-NNN-<slug>`. No new worktree unless needed; never implement directly on `master`.
3. Keep a compact `.execplans/` plan for substantial work: goal, authorization, design, validation, non-goals, progress.
4. Implement only the assigned scope. Use existing npm commands; this repo has no Makefile.

## Validation
Run from the repo root; read `DEPLOYMENT.md` for publishing details:
```sh
npm ci --prefix themes/toha-3.8.0 --ignore-scripts
npm audit --prefix themes/toha-3.8.0 --audit-level=low
npm run build
npm test
git diff --check
```
Use Node.js 24 and pinned Hugo Extended 0.113.0. `npm run serve` starts local preview.
Run `actionlint .github/workflows/pages.yml` for workflow edits. Docs-only changes need path/command checks, TOML parsing when relevant, and diff checks, not a full site rebuild.

## Routing And Review
- Load the installed `model-efficiency` skill when available; `.agents/MODEL_ROUTING.toml` is the local routing contract, not Codex configuration.
- Keep tiny sequential work local. Delegate bounded cheap work only when it saves total effort; use no fast service tiers and avoid duplicate validation.
- Before every PR, including docs/config, run one bounded read-only `code_reviewer` pass (Sol/xhigh), covering every ticket, correctness, security, regressions, test gaps, and cleanup together.
- Resolve blockers before opening. Only materially changed behavior needs targeted follow-up; do not start another general review.
- If routing is unavailable, disclose the fallback; label local self-review non-independent. Record requested/actual model and effort separately; actual is `unknown` when unobservable.
- Evidence must bind repository, ticket IDs, base/head SHAs, scope, review mode, routing/fallback, timestamp, findings/dispositions, validation, and outcome. Reassess coverage whenever either SHA changes.
- Use `gh` for the pushed task branch/PR. Publish a dedicated review comment, separate from the PR body, via installed `github-review`; inspect `--help` rather than guessing its interface. If unavailable, publish the same evidence with `gh pr comment` and disclose the tooling fallback. Failed publication leaves handoff incomplete.

## Production Handoff
PR CI validates without publishing. Merging to `master` automatically builds and deploys production, so require explicit merge/deployment authorization, current review evidence, and green CI.
After an authorized merge, verify the workflow and exact deployed SHA, live HTTPS domain/assets, and relevant alert state. Never dismiss unfixed alerts. Report PR/SHA/run URL, checks, remaining blockers, and a clean continuation checkpoint; coordinate vault updates with its owner.
