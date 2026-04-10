# Monorepo AGENTS.md (Root)

This root file contains shared rules for the whole repository.

App-specific implementation rules live in:

- `apps/frontend/AGENTS.md`
- `apps/backend/AGENTS.md`

When working in an app, always follow that app's AGENTS.md first.

---

# Repository Scope

This is a monorepo with separate frontend and backend applications.

- Frontend scope: `apps/frontend/**`
- Backend scope: `apps/backend/**`

Do not mix frontend and backend changes in one task unless explicitly requested.

---

# Source of Truth Order

When rules overlap, use this priority:

1. Task/request from the user
2. App-specific AGENTS.md (`apps/frontend` or `apps/backend`)
3. Root AGENTS.md (this file)

---

# Shared Engineering Standards

- Keep code production-ready; no placeholders or commented-out dead code.
- Remove unused imports, variables, and unreachable code.
- Do not leave debug logs in committed code (`console.log`, `console.warn`, `console.error`, `console.debug`).
- Handle errors explicitly with predictable responses or clear thrown errors (per app architecture).
- Prefer constants/config over repeated hardcoded values.
- Keep functions small, readable, and single-purpose.
- Follow existing architecture and patterns before introducing new ones.
- Avoid unrelated refactors when completing a focused task.

---

# Naming & Documentation Baseline

- Use descriptive names and consistent project conventions.
- Exported functions should include short JSDoc comments.
- Keep naming conventions aligned with the active app's AGENTS.md.

---

# Security & Configuration

- Never expose secrets or credentials.
- Never commit hardcoded sensitive values.
- Keep environment variables app-scoped:
  - Frontend: `apps/frontend/.env`
  - Backend: `apps/backend/.env`
- Mirror required env keys in each app's `.env.example`.

---

# Validation Before Handoff

Before finalizing changes:

- Run relevant lint/type/test checks for the app changed.
- Verify no unrelated files were unintentionally modified.
- Summarize what changed, why, assumptions, and follow-up steps.

---

# Quick Routing

If the task is about Next.js/React/Tailwind/UI, follow:

- `apps/frontend/AGENTS.md`

If the task is about Hono/Supabase/API/service layers, follow:

- `apps/backend/AGENTS.md`
