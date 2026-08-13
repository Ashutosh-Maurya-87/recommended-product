# Recommended Product — Fullstack (Frontend + Backend)

A professional, full-stack recommendation service providing product discovery and personalized recommendations. This repository contains two main apps:

- `backend`: TypeScript Node.js API (Express-like) that serves recommendation data and runs queries against a database.
- `frontend`: Next.js React app that provides the UI for browsing products and viewing recommendation graphs.

---

## Key Features

- Product listing and detail pages
- Recommendation engine endpoints for personalized suggestions
- Dashboard and graph visualizations (explorer UI)
- Seed and test scripts for local development

---

## Tech Stack

- Backend: Node.js, TypeScript
	- Entry: [backend/src/server.ts](backend/src/server.ts#L1)
	- DB layer and queries: [backend/src/queries](backend/src/queries)
	- Scripts: [backend/scripts](backend/scripts)
- Frontend: Next.js, React, TypeScript
	- Entry: [frontend/app/page.tsx](frontend/app/page.tsx#L1)
	- Components: [frontend/app/components](frontend/app/components)

---

## Repository Layout

- `backend/` — API server, services, controllers, queries, and DB driver
- `frontend/` — Next.js application, components, pages, and client API wrapper

Refer to these top-level files:

- [backend/package.json](backend/package.json#L1)
- [frontend/package.json](frontend/package.json#L1)

---

## Getting Started (Developer)

Prerequisites:

- Node.js (recommended 18.x or later)
- A supported database (configured via environment variables; see Backend Env below)

1. Clone the repository

```bash
git clone <repo-url> recommended-product
cd recommended-product
```

2. Install dependencies for backend and frontend

```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Configure environment variables (backend and frontend)

See the `Backend Environment` and `Frontend Environment` sections below for required variables.

4. Run services in development

Backend (from `backend/`):

```bash
npm run dev
```

Frontend (from `frontend/`):

```bash
npm run dev
```

Open the frontend at http://localhost:3000 (Next.js default) and the backend API at the configured port (default shown in `backend/src/server.ts`).

---

## Backend

**Overview:** The backend implements controllers, services, and query files to fetch and compute recommendations and dashboard/graph data. It exposes REST endpoints consumed by the frontend.

**Main folders:**
- `backend/src/controllers` — route handlers
- `backend/src/services` — business logic
- `backend/src/queries` — SQL or DB query modules
- `backend/src/db` — driver and connection helpers

**Important files:**
- [backend/src/server.ts](backend/src/server.ts#L1) — server bootstrap and route registration
- [backend/scripts/seed.ts](backend/scripts/seed.ts#L1) — seed data script
- [backend/scripts/testQueries.ts](backend/scripts/testQueries.ts#L1) — quick DB query runner for development

### Backend Environment

Create a `.env` file (or use your environment system) with the following variables as applicable:

- `PORT` — API port (e.g., `4000`)
- `DB_HOST` — database host
- `DB_PORT` — database port
- `DB_NAME` — database name
- `DB_USER` — database user
- `DB_PASS` — database password

Adjust names based on how `backend/src/db/driver.ts` reads them.

### Backend scripts

- `npm run dev` — Start backend in development mode (watch)
- `npm run build` — Compile TypeScript
- `npm run start` — Start compiled server
- `npm run seed` — Run `backend/scripts/seed.ts` to populate sample data

(See [backend/package.json](backend/package.json#L1) for script specifics.)

### Database

The repository uses a simple DB access layer under `backend/src/db`. The `queries` folder contains schema and query files:

- `backend/src/queries/schema.queries.ts` — schema definitions or DDL helpers
- `backend/src/queries/recommendation.queries.ts` — recommendation-related queries

For local development, you can run a local PostgreSQL/MySQL instance (or SQLite if adapted) and point the `DB_*` env vars to it.

### Testing & Diagnostics

- `backend/scripts/testQueries.ts` helps verify DB connectivity and query results.
- Add unit tests and integration tests as needed (not included by default).

---

## Frontend

**Overview:** The frontend is a Next.js app written in TypeScript. It consumes backend APIs to display products, recommendation lists, dashboard metrics, and interactive graphs.

**Main folders:**
- `frontend/app` — Next.js App Router pages and layout
- `frontend/app/components` — reusable UI components like `ProductCard`, `ProductGrid`, `GraphExplorer`
- `frontend/lib` — client API wrappers (see `frontend/lib/api.ts`)
- `frontend/public` — static assets

**Important files:**
- [frontend/app/page.tsx](frontend/app/page.tsx#L1) — homepage
- [frontend/app/products/[id]/page.tsx](frontend/app/products/[id]/page.tsx#L1) — product detail page
- [frontend/app/components/ProductCard.tsx](frontend/app/components/ProductCard.tsx#L1) — product card component

### Frontend Environment

- `NEXT_PUBLIC_API_BASE` — base URL for backend API (e.g., `http://localhost:4000/api`)

Add this to `.env.local` in `frontend/` for local development.

### Frontend scripts

- `npm run dev` — Start Next.js dev server
- `npm run build` — Build for production
- `npm run start` — Run production server

(See [frontend/package.json](frontend/package.json#L1) for details.)

---

## Development Workflow

- Run backend and frontend concurrently during development. You may use tools like `concurrently` or two terminals.
- Use the seed script to populate demo data before exploring the UI.
- When adding API endpoints, update both the backend controller and the corresponding client call in `frontend/lib/api.ts`.

---

## Deployment

- Backend: containerize or deploy to your preferred Node.js host. Ensure env vars for DB and port are provided.
- Frontend: build (`npm run build`) and deploy static/server assets to Vercel, Netlify, or a Node host that supports Next.js.

---

## Contributing

- Fork the project and open pull requests against `main`.
- Add tests for new behavior and keep changes focused and well-documented.

---

## Troubleshooting

- If the frontend cannot reach the API, confirm `NEXT_PUBLIC_API_BASE` points to the running backend and CORS is enabled in the backend server.
- If DB connections fail, verify `DB_*` variables and that the DB accepts connections from your host.

---

## Contact

For questions or help, open an issue in the repository or contact the maintainers.

---

## License

This project is provided under an open-source license — add a LICENSE file to indicate the chosen license.

