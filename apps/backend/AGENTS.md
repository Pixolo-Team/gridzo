# Hono Backend – Copilot Instructions & Coding Standards

This document defines mandatory coding rules for `apps/backend` in this monorepo.

All contributors (human or AI) must follow these rules strictly.

This backend is a production-grade Hono.js REST API built with TypeScript, deployed on Vercel, and using Supabase for database/auth.

If generated code violates these rules, it is considered incorrect even if it works.

---

# Scope

These rules apply only to:

- `apps/backend/**`

For frontend work, follow `apps/frontend/AGENTS.md`.

---

# Tech Stack

- Hono
- TypeScript (strict mode)
- Supabase JS
- Vercel
- ESLint + Prettier
- Husky
- tsx

---

# Folder Structure

```txt
apps/backend/
├── src/
│   ├── index.ts
│   ├── config/
│   │   └── supabase.ts
│   ├── common/
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   └── modules/
│       ├── auth/
│       │   ├── auth.routes.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── auth.types.ts
│       └── <module>/
│           ├── <module>.routes.ts
│           ├── <module>.controller.ts
│           ├── <module>.service.ts
│           └── <module>.types.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── eslint.config.ts
```

---

# Architecture Rule (STRICT)

Flow must always be:

```txt
Route -> Controller -> Service -> Supabase
```

Never break this flow.

- No DB logic in controller
- No HTTP logic in service
- No business logic in routes

---

# Module Architecture

Each module must contain exactly 4 files:

- `<module>.routes.ts`
- `<module>.controller.ts`
- `<module>.service.ts`
- `<module>.types.ts`

---

# Layer Responsibilities

- Routes: define endpoints only
- Controller: parse request, call service, send response
- Service: business logic + Supabase queries
- Types: TypeScript interfaces only

---

# Import Head Convention (MANDATORY)

Every backend file must follow this grouped import format and exact order:

```ts
// TYPES //
import type { Context } from "hono";
import type { FeatureData } from "./feature.types.js";

// CONFIG //
import { supabase } from "../../config/supabase.js";

// CONSTANTS //
import { EMAIL_REGEX } from "../../common/constants/regex.constants.js";

// UTILS //
import { isValidEmail } from "../../common/utils/email.util.js";

// SERVICES //
import { createFeatureService } from "./feature.service.js";

// LIBRARIES //
import { Hono } from "hono";
```

Rules:

- Always use `.js` extensions in local imports
- Always use `import type` for type-only imports
- Never mix type + runtime imports in one import statement
- No default exports
- No wildcard imports
- No unused imports
- Keep group order exactly as defined

---

# Utility & Constants Architecture (MANDATORY)

Never define inline:

- Regex
- Validation helpers
- Formatting helpers
- Parsing helpers
- Magic numbers
- Reusable constants

inside:

- Routes
- Controllers
- Services

Reusable logic must live in:

- `apps/backend/src/common/utils`

Constants must live in:

- `apps/backend/src/common/constants`

---

# Standard Response Shape

All controller responses must use `sendResponse()`.

```json
{
  "data": "<T> | null",
  "status": "success | error",
  "status_code": 200,
  "message": "Human readable message",
  "error": "null | error detail string"
}
```

Rules:

- Pass `null` data on error
- Pass `null` error on success
- Never use `c.json()` directly in controllers

---

# Service Return Pattern (MANDATORY)

Services must return `QueryResponseData<T>` with this structure:

```ts
interface QueryResponseData<T> {
  data: T | null;
  error: Error | null;
}
```

Rules:

- Services never throw
- Services always catch errors
- Controllers decide HTTP status mapping
- Services must not access Hono `Context`

---

# TypeScript Rules

- Strict mode enabled
- No `any`
- Explicit return types on functions
- Use `interface` for data contracts
- Use `import type`
- ESM only (no CommonJS)
- Named exports only
- Every exported function must include JSDoc

---

# JSDoc Requirement

Every exported function must include:

```ts
/**
 * Short description
 * @param paramName - Description
 * @returns Description
 */
```

---

# Clean Code Rules

- One responsibility per function
- Prefer functions <= 30 lines
- Prefer early returns
- Max 2 nesting levels where possible
- Keep files <= 150 lines where practical
- Use descriptive camelCase names
- No magic values

Service function names must end with `Service`.

---

# Supabase Rules

- Queries only inside service files
- Always destructure `{ data, error }`
- Always check and handle `error`
- Prefer explicit column selection
- Never create a Supabase client inside modules
- Use shared client from config
- Respect RLS policies

---

# Error Handling

- Keep global error handling in `src/index.ts`
- Implement `app.notFound()` for 404
- Services return `QueryResponseData<T>` and do not throw
- Controllers map service errors to HTTP status/response
- Do not expose raw DB error internals in production responses

---

# Security Rules

- Never log secrets
- Never expose env variable values
- Validate input before DB calls
- Do not bypass RLS
- No hardcoded credentials

---

# Environment Variables

- Define in `apps/backend/.env`
- Mirror keys in `apps/backend/.env.example`
- Access via `process.env.VARIABLE_NAME`
- Keep backend and frontend env files separate (`apps/backend/.env` and `apps/frontend/.env`)
- Never read frontend-only env variables inside backend code

---

# Dev Scripts

From `apps/backend`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

Lint must pass before commit.

---

# Final Mandatory Rules Summary

Always:

- Follow `Route -> Controller -> Service -> Supabase`
- Use `QueryResponseData<T>` from services
- Use `sendResponse()` in controllers
- Use explicit return types
- Follow grouped import convention
- Extract reusable logic into `common/utils`
- Extract constants into `common/constants`
- Never define regex/helpers in services/controllers/routes
- Keep files small and readable
- Use interfaces for data contracts
- Use `.js` local import extensions
- Avoid `any`
- Use named exports
- Keep DB logic out of controllers
- Keep HTTP/Hono context out of services
