This document outlines the project structure and rules an LLM must follow when making changes to this project. Do not change this document unless it's necessary.

## Project

The project is a personal trainer's (PT) website, with front end only. The goal is to provide information about the PT and allow users to contact the PT. The business goal is to establish trust, credibility, and increase inbound queries.

The project uses React and Vite, written in TS. i18n is used for all copy - this is important for future AI edits, as most likely future changes are all simple content updates. For all other dependencies read package.json - these could be changed as necessary.

## Deployment and hosting

The source lives on GitHub. Cloudflare Pages is connected to that repo and is what actually builds and serves the site — a commit to `main` triggers a Pages build and deploy. The CF build settings are build command `npm run build`, output folder `dist/spa`, root directory left blank (the repo root), production branch `main` with automated deployments enabled. Build system on version 3. GitHub Pages is not used, and neither is the `netlify.toml` left in the repo root.

The env var includes `VITE_EMAIL_ENDPOINT` variable only. This is a URL that points to a Cloudflare Worker that accept submissions from the deployed domain davidcluniecoaching.com only, to use a MailerSend API token to send an email based on the form submission. The worker's code is at /cf_worker_email_sender.js

The worker needs these bindings set in its own Cloudflare dashboard — they are Worker bindings, not Pages env vars, and the token must never be committed to this repo: secret `MAILERSEND_API_TOKEN`, vars `TO_EMAIL` and `FROM_EMAIL` (must be on a MailerSend-verified domain), plus optional `FROM_NAME`.
