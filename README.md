# Gridzo Monorepo

Gridzo uses a monorepo layout with separate application boundaries:

- `apps/frontend` → Next.js frontend application
- `apps/backend` → Node.js backend application

All frontend development must stay inside `apps/frontend`, and all backend development must stay inside `apps/backend`.

## Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

## Backend

```bash
cd apps/backend
npm install
cp .env.example .env
npm run dev
```

Backend requires a Supabase PostgreSQL connection string in `DATABASE_URL`.
