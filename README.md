# Botlly — AI Local Business Sales Agent

## Live website

The public marketing site is deployed to GitHub Pages at **https://sites-ai-maker.github.io/website/** after the deployment workflow succeeds on the `main` branch. It is a public HTTPS URL, not a `localhost` address.

### Publish to GitHub Pages

1. Push this repository to `https://github.com/sites-ai-maker/website` and merge this change into `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions** if it is not already selected.
3. Open the **Actions** tab and wait for **Deploy marketing site to GitHub Pages** to finish. You can also run it manually with **Run workflow**.
4. Open `https://sites-ai-maker.github.io/website/`.

The workflow publishes only the static marketing assets (`index.html` and `styles.css`). The application, database schema, worker, and any environment variables are deliberately excluded from the public Pages artifact.

## Phase 1
This repository now provides the first foundation for a compliant local-business discovery platform: PostgreSQL data model, secure seeded-admin login, city/niche APIs, discovery job creation, deterministic scoring, duplicate helpers, a clearly marked mock provider, and an Arabic RTL admin dashboard.

### Architecture decisions
- **Next.js + TypeScript** hosts the dashboard and API surface.
- **PostgreSQL + Prisma** stores normalized operational data using UUIDs and relations.
- **Approved-provider boundary:** `lib/providers.ts` defines the discovery and website-verification boundary. The only included provider is an explicit development mock; it never scrapes or bypasses access controls.
- **Worker separation:** discovery is queued as a `DiscoveryJob` and processed outside the HTTP request by `worker.ts`. Production deployment should replace the polling MVP worker with BullMQ/Redis queue orchestration before high-volume use.
- **Security:** initial password comes only from `ADMIN_INITIAL_PASSWORD`; bcrypt hashes it, login sets an HTTP-only session cookie, locks after five failed attempts, and writes audit events. Add route authorization middleware and CSRF enforcement before exposing write endpoints publicly.

## Local development
1. Copy `.env.example` to `.env` and set a long random `ADMIN_INITIAL_PASSWORD` and `SESSION_SECRET`.
2. Start PostgreSQL and Redis: `docker compose up -d postgres redis`.
3. Install dependencies: `npm install`.
4. Run migrations and seed: `npm run db:migrate && npm run db:seed`.
5. Run the app and worker in separate terminals: `npm run dev` and `npm run worker`.

## Checks
Run `npm run pages:prepare`, `npm run test`, `npm run build`, and `docker compose config`.

## Privacy and data provenance
Only connect approved API providers. Store source attribution in `BusinessSource`; do not ingest private data or unlicensed media. Delete or soft-delete records in response to privacy/opt-out requests. Never put API keys or passwords in source control.
