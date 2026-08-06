This document outlines the project structure and rules an LLM must follow when making changes to this project. Do not change this document unless it's necessary.

## Project

The project is a personal trainer's (PT) website, with front end only. The goal is to provide information about the PT and allow users to contact the PT. The business goal is to establish trust, credibility, and increase inbound queries.

The project uses React and Vite, written in TS. i18n is used for all copy - this is important for future AI edits, as most likely future changes are all simple content updates. For all other dependencies read package.json - these could be changed as necessary.

## Domain, DNS and email infrastructure

The production domain is **davidcluniecoaching.com** (the `www` subdomain is also live and both are treated as production). The domain registration and all DNS are with **Cloudflare**, so DNS changes are made in the Cloudflare dashboard alongside Pages and Workers.

Two separate email systems exist and must not be confused:

- **Receiving** — the owner's mailbox is **Zoho Mail** (EU region). The domain's `MX` records point at `mx.zoho.eu` and SPF includes `zohomail.eu`. Nothing in this project sends or reads that mailbox.
- **Sending** — transactional email from the contact form goes out via **MailerSend**. The domain is verified there, with DKIM published as a CNAME at the `ms1._domainkey` selector.

SPF caution: a domain may have only ONE `v=spf1` TXT record. The existing record covers Zoho. If a MailerSend include is ever added it must be merged into that record (`v=spf1 include:zohomail.eu include:_spf.mailersend.net ~all`), never added as a second record — two SPF records break SPF for both systems. MailerSend verifies via DKIM and its own return-path, so it sends successfully without an SPF include; adding one only improves alignment. There is currently no DMARC record.

## Deployment and hosting

The source lives on GitHub. Cloudflare Pages is connected to that repo and is what actually builds and serves the site — a commit to `main` triggers a Pages build and deploy. The CF build settings are build command `npm run build`, output folder `dist/spa`, root directory left blank (the repo root), production branch `main` with automated deployments enabled. Build system on version 3. GitHub Pages is not used, and neither is the `netlify.toml` left in the repo root.

The Pages env var includes `VITE_EMAIL_ENDPOINT` variable only. This is a URL that points to a Cloudflare Worker that accept submissions from the deployed domain davidcluniecoaching.com only, to use a MailerSend API token to send an email based on the form submission. Vite inlines this value into the client bundle at build time, so changing it requires a rebuild, and the URL is publicly visible in the shipped JS — the worker's `Origin` allowlist is what actually gates it, not URL secrecy.

`VITE_EMAIL_ENDPOINT` must be an **absolute URL including `https://`**. A schemeless value is not absolute, so `fetch` resolves it against the site's own origin and POSTs to Pages, which answers 405. `normaliseEndpoint` in Contact.tsx now prepends the scheme defensively, but the env var should still be set correctly.

### Dependencies and the lockfile

`package-lock.json` must record the platform binaries for **every** OS, not just macOS. Cloudflare builds on Linux x64 with `npm clean-install`, which installs strictly from the lock — if the lock only lists e.g. `@rollup/rollup-darwin-arm64` and `@swc/core-darwin-arm64`, the build dies with "Cannot find module @rollup/rollup-linux-x64-gnu".

npm prunes these to the host platform, and regenerating in place does not fix it: with an existing lock or `node_modules` present, npm faithfully reproduces the pruned set. The lock must be resolved with **both absent** — generate it in an empty directory containing only `package.json` and `.npmrc`, then copy it in, or delete both `package-lock.json` and `node_modules` before running `npm install`. Verify with `grep -c '"node_modules/@rollup/rollup-' package-lock.json`, which should report ~25 rather than 1. Note that regenerating re-resolves the whole tree, so expect a large diff of transitive version bumps.

Also note `package.json` still declares `"packageManager": "pnpm@..."` while the repo ships an npm lockfile and Cloudflare builds with npm. It is currently ignored and harmless, but it is misleading.

For local development the var is absent, so the contact form deliberately shows the "not configured" error instead of posting. To exercise the form locally, put `VITE_EMAIL_ENDPOINT=<worker url>` in `.env.local` — that file is gitignored, whereas `.env` is committed and must never hold secrets.

## The email worker

The worker's code is at /cf_worker_email_sender.js and its deploy config is /wrangler.toml. The deployed worker is named **`yellow-salad-ba6f`** (Cloudflare's auto-generated name, kept because `VITE_EMAIL_ENDPOINT` points at its `workers.dev` URL).

It accepts a JSON POST of `firstName`, `lastName`, `email`, `subject`, `message`, and sets MailerSend's `reply_to` to the enquirer so that replying from the inbox reaches them rather than `FROM_EMAIL`. The enquirer's address also appears in the email body. Any change to the form fields in Contact.tsx must be mirrored in the worker's validation, or submissions will fail with 400.

Deployment is via **Cloudflare Workers Builds**, git-connected to the same GitHub repo as Pages, so a push to `main` deploys the worker as well as the site. The two are separate Cloudflare projects reading one repo: the Pages project builds `dist/spa`, the Workers project runs `npx wrangler deploy` against `wrangler.toml`.

Configuration rules that matter when editing this:

- `name` in wrangler.toml must exactly match the already-deployed worker. A mismatch silently creates a second worker on a different URL while `VITE_EMAIL_ENDPOINT` keeps pointing at the old one.
- Non-secret config (`TO_EMAIL`, `FROM_EMAIL`, `FROM_NAME`) belongs in the `[vars]` block of wrangler.toml, not the dashboard. `wrangler deploy` overwrites dashboard-set plain-text vars, so anything not in the file gets wiped on the next deploy.
- `MAILERSEND_API_TOKEN` is a secret, set once via `npx wrangler secret put MAILERSEND_API_TOKEN` or the dashboard. Secrets are stored encrypted and survive deploys, so it is never listed in wrangler.toml and never committed to this repo.
- `FROM_EMAIL` must be on a domain verified in MailerSend, or sends fail.
- Pages logs a warning on every build that wrangler.toml "does not appear to be valid" and lacks `pages_build_output_dir`. This is expected — that file configures the Worker, not Pages. Pages skips it and continues; it is not an error.

### Testing and diagnosing failures

The `Origin` allowlist contains only the production domain and its `www` form. **Contact form submissions from `*.pages.dev` preview deployments will fail**, because the CORS preflight is rejected before anything else runs — the browser reports this as an opaque preflight/CORS error rather than showing the 403 body. The form can therefore only be tested on the real domain.

Because the worker returns deliberately generic errors to the browser, the real cause is only visible in its logs via `npx wrangler tail yellow-salad-ba6f` (or the dashboard log stream). Mapping of what the browser sees:

- **403** — the request's `Origin` is not in the allowlist. Usually means testing from a preview URL.
- **405** — the POST never reached the worker; `VITE_EMAIL_ENDPOINT` is missing its scheme and hit Pages instead.
- **400** — a required field was empty, or `email` failed the format check.
- **500 "Server misconfigured"** — a binding is missing: the token secret, `TO_EMAIL`, or `FROM_EMAIL`.
- **502 "Failed to send"** — the worker reached MailerSend and MailerSend refused. Check the logged status: 401 means an invalid or rotated token, 422 usually means an unverified sender domain or a rejected payload field, 403 can mean trial-account recipient restrictions.

Read-only checks that need no form submission: `npx wrangler secret list` confirms the token binding exists, and `curl -s https://api.mailersend.com/v1/domains -H "Authorization: Bearer <token>"` reports `is_verified` and `is_dns_active` for the sending domain.
