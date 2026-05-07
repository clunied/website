/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Worker URL for the contact form POST */
  readonly VITE_EMAIL_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
