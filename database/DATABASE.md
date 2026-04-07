# Database Documentation — Gridzo

## Overview

This database powers **Gridzo**, a headless CMS built on top of Google Sheets.

Core principles:

- Invite-only access
- Project-based permissions
- Google OAuth authentication (via Supabase)
- Each project has its own structure + Google credentials

---

# Core Entities

- Users → authenticated via Google
- Projects → main working unit
- Project Members → access control
- Project Invitations → invite system
- Project Structures → schema (JSON/PHP)
- Project Configs → Google credentials & Other Information

---

# USERS

## Purpose

Stores all users allowed to access the system.

## Columns

| Column        | Type          | Description             |
| ------------- | ------------- | ----------------------- |
| id            | UUID (PK)     | Internal user ID        |
| auth_id       | UUID          | Supabase user ID        |
| email         | TEXT (UNIQUE) | User email              |
| full_name     | TEXT          | User's name from Google |
| avatar_url    | TEXT          | Profile image           |
| google_id     | TEXT          | Google identifier       |
| status        | ENUM          | user_status             |
| created_at    | TIMESTAMP     | Created time            |
| updated_at    | TIMESTAMP     | Updated time            |
| last_login_at | TIMESTAMP     | Last login              |

## user_status Enum

```text
invited
active
disabled
inactive
```

---

# PROJECTS

## Purpose

Represents a CMS project.

## Columns

| Column             | Type          | Description      |
| ------------------ | ------------- | ---------------- |
| id                 | UUID (PK)     | Project ID       |
| name               | TEXT          | Project name     |
| category           | TEXT          | Project category |
| website_url        | TEXT          | Website URL      |
| slug               | TEXT (UNIQUE) | Unique slug      |
| created_by_user_id | UUID (FK)     | Creator          |
| owner_user_id      | UUID (FK)     | Owner            |
| status             | ENUM          | project_status   |
| created_at         | TIMESTAMP     | Created          |
| updated_at         | TIMESTAMP     | Updated          |

## project_status Enum

```text
active
archived
deleted
```

---

# PROJECT MEMBERS (project_user)

## Purpose

Defines which users have access to which projects.

## Columns

| Column     | Type      |
| ---------- | --------- | ------------- |
| project_id | UUID (FK) |
| user_id    | UUID (FK) |
| role       | ENUM      | project_roles |

## project_roles Enum

```text
owner
admin
editor
viewer
```

## Notes

- One user can belong to many projects
- One project can have many users
- Unique constraint on `(project_id, user_id)`

---

# PROJECT INVITATIONS

## Purpose

Handles invite-based access.

## Columns

| Column             | Type                |
| ------------------ | ------------------- | ----------------- |
| id                 | UUID (PK)           |
| project_id         | UUID (FK)           |
| invited_user_id    | UUID (FK, nullable) |
| invited_by_user_id | UUID (FK)           |
| role               | ENUM                | project_roles     |
| status             | ENUM                | invitation_status |
| responded_at       | TIMESTAMP           |
| expires_at         | TIMESTAMP           |
| created_at         | TIMESTAMP           |
| updated_at         | TIMESTAMP           |

## invitation_status Enum

```text
pending
accepted
rejected
expired
revoked
```

---

# PROJECT STRUCTURE VERSIONS

## Purpose

Stores schema definition (JSON + PHP).

## Columns

| Column             | Type      |
| ------------------ | --------- |
| id                 | UUID (PK) |
| project_id         | UUID (FK) |
| version            | TEXT      |
| json_code          | JSON      |
| php_code           | TEXT      |
| is_current         | BOOLEAN   |
| created_by_user_id | UUID (FK) |
| created_at         | TIMESTAMP |
| updated_at         | TIMESTAMP |

## Notes

- Only one version should have `is_current = true`
- Supports versioning and rollback

---

# GOOGLE SHEET CREDENTIALS

## Purpose

Stores Google API credentials per project.

## Columns

| Column               | Type      |
| -------------------- | --------- |
| id                   | UUID (PK) |
| project_id           | UUID (FK) |
| google_sheet_id      | TEXT      |
| google_project_id    | TEXT      |
| private_key_id       | TEXT      |
| client_email         | TEXT      |
| client_id            | TEXT      |
| client_x509_cert_url | TEXT      |
| private_key          | TEXT      |
| created_at           | TIMESTAMP |
| updated_at           | TIMESTAMP |

## Security Note

- `private_key` must be encrypted before storage
- Never expose full credentials to frontend after creation

---

# AUTHENTICATION FLOW

1. User logs in via Google (Supabase)
2. Backend verifies email exists in `users`
3. If not → access denied
4. If yes → allow login

---

# INVITE FLOW

1. Owner invites email
2. Entry created in `project_invitations`
3. If user doesn’t exist → create with `status = invited`
4. On Invitation Accept:
   - mark invite as accepted
   - add to `project_user`

---

# PROJECT ACCESS RULE

Users can only access projects where:

```sql
project_user.user_id = current_user.id
```

---

# PROJECT CREATION FLOW

1. Create project
2. Add creator as `owner` in project_user
3. Store Google credentials
4. Save structure JSON

---

# IMPORTANT RULES

## DO

- Always use `<table>_id` for foreign keys
- Enforce enum values strictly
- Validate JSON structure before saving

## DO NOT

- Allow login without invite
- Store private keys in plain text
- Mix auth logic with project logic

---

# 🏁 Summary

This schema supports:

- Multi-project system
- Role-based access control
- Versioned content structure
- Google Sheets integration
- Secure invite-only access

---
