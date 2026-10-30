# Portfolio Homepage

Read `WORKFLOWS.md`, `DEPLOYMENT.md`, and `.agents/MODEL_ROUTING.toml` before work.
These repo-local rules are self-contained; no private workflow checkout is required.

## Project Context
- Static Hugo portfolio for `https://christophervikner.se/`, hosted by GitHub Pages.
- Preserve `static/CNAME`, HTTPS/baseURL, Toha 3.8.0, and Hugo Extended 0.113.0.
- Theme/Hugo upgrades need a separate visual-regression-tested ticket; no redesign by default.
- `master` is the existing default/production branch; no `develop` exists. Do not create it or change defaults.
- Vault: `/Users/northcube/Documents/Github/Workflow/christopher-vault`, project `portfolio-homepage` under `10 Projects/portfolio-homepage`.
- Use the assigned vault ticket; during coordinated T-004 work, the parent owns vault edits/status.

## Safety
- Preserve dirty/user edits and other workers' files; scope work to this repo.
- Never amend, force-push, delete branches, or use destructive Git commands without explicit authorization.
- Do not inspect/print signing secrets or install/renew credentials. Settings, secrets, permissions, and protected environments require explicit authorization to change.
- Keep generated `public/`, `resources/_gen/`, and `node_modules/` out of commits; logs go in `/private/tmp`.
