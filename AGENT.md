This document outlines the project structure and rules an LLM must follow when making changes to this project. Do not change this document unless it's necessary.

## Project

The project is a personal trainer's (PT) website, with front end only. The goal is to provide information about the PT and allow users to contact the PT. The business goal is to establish trust, credibility, and increase inbound queries.

The project uses React and Vite, written in TS. i18n is used for all copy - this is important for future AI edits, as most likely future changes are all simple content updates. For all other dependencies read package.json - these could be changed as necessary.

## Deployment and hosting

The project is hosted by Github pages, and commits trigger a build and deploy flow via Cloudflare Pages. The CF build settings are with build command `npm run build` and output folder at `dist/spa`, root directory ``, and production branch is set to `main` with automated deployments enabled. Build system on version 3.

The env var includes `VITE_EMAIL_ENDPOINT` variable only. This is a URL that points to a Cloudflare Worker that accept submissions from the deployed domain davidcluniecoaching.com only, to use a MailerSend API token to send an email based on the form submission. The worker's code is at /cf_worker_email_sender.js
