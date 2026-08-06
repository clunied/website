This document outlines the project structure and rules an LLM must follow when making changes to this project. Do not change this document unless it's necessary.

## Project

The project is a personal trainer's (PT) website, with front end only. The goal is to provide information about the PT and allow users to contact the PT. The business goal is to establish trust, credibility, and increase inbound queries.

The project uses React and Vite, written in TS. i18n is used for all copy - this is important for future AI edits, as most likely future changes are all simple content updates. For all other dependencies read package.json - these could be changed as necessary.

## Deployment and hosting

The source lives on GitHub. Cloudflare Pages is connected to that repo and is what actually builds and serves the site — a commit to `main` triggers a Pages build and deploy. The CF build settings are build command `npm run build`, output folder `dist/spa`, root directory left blank (the repo root), production branch `main` with automated deployments enabled. Build system on version 3. GitHub Pages is not used, and neither is the `netlify.toml` left in the repo root.

The Pages env var includes `VITE_EMAIL_ENDPOINT` variable only. This is a URL that points to a Cloudflare Worker that accept submissions from the deployed domain davidcluniecoaching.com only, to use a MailerSend API token to send an email based on the form submission. Vite inlines this value into the client bundle at build time, so changing it requires a rebuild, and the URL is publicly visible in the shipped JS — the worker's `Origin` allowlist is what actually gates it, not URL secrecy.

For local development the var is absent, so the contact form deliberately shows the "not configured" error instead of posting. To exercise the form locally, put `VITE_EMAIL_ENDPOINT=<worker url>` in `.env.local` — that file is gitignored, whereas `.env` is committed and must never hold secrets.

## The email worker

The worker's code is at /cf_worker_email_sender.js and its deploy config is /wrangler.toml.

Deployment is via **Cloudflare Workers Builds**, git-connected to the same GitHub repo as Pages, so a push to `main` deploys the worker as well as the site. The two are separate Cloudflare projects reading one repo: the Pages project builds `dist/spa`, the Workers project runs `npx wrangler deploy` against `wrangler.toml`.

Configuration rules that matter when editing this:

- `name` in wrangler.toml must exactly match the already-deployed worker. A mismatch silently creates a second worker on a different URL while `VITE_EMAIL_ENDPOINT` keeps pointing at the old one.
- Non-secret config (`TO_EMAIL`, `FROM_EMAIL`, `FROM_NAME`) belongs in the `[vars]` block of wrangler.toml, not the dashboard. `wrangler deploy` overwrites dashboard-set plain-text vars, so anything not in the file gets wiped on the next deploy.
- `MAILERSEND_API_TOKEN` is a secret, set once via `npx wrangler secret put MAILERSEND_API_TOKEN` or the dashboard. Secrets are stored encrypted and survive deploys, so it is never listed in wrangler.toml and never committed to this repo.
- `FROM_EMAIL` must be on a domain verified in MailerSend, or sends fail.
