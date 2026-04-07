-- =========================================
-- 🧱 Grido Database Schema (Supabase)
-- =========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- ENUMS
-- =========================================

CREATE TYPE user_status AS ENUM (
'invited',
'active',
'disabled',
'inactive'
);

CREATE TYPE project_status AS ENUM (
'active',
'archived',
'deleted'
);

CREATE TYPE project_role AS ENUM (
'owner',
'admin',
'editor',
'viewer'
);

CREATE TYPE invite_status AS ENUM (
'pending',
'accepted',
'rejected',
'expired',
'revoked'
);

-- =========================================
-- USERS
-- =========================================

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
auth_id UUID UNIQUE,
email TEXT UNIQUE NOT NULL,
full_name TEXT,
avatar_url TEXT,
google_id TEXT,

status user_status NOT NULL DEFAULT 'active',

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
last_login_at TIMESTAMP WITH TIME ZONE
);

-- =========================================
-- PROJECTS
-- =========================================

CREATE TABLE projects (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

name TEXT NOT NULL,
category TEXT DEFAULT 'web-app',
website_url TEXT,
slug TEXT UNIQUE NOT NULL,

created_by_user_id UUID NOT NULL,
owner_user_id UUID NOT NULL,

status project_status NOT NULL DEFAULT 'active',

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

CONSTRAINT fk_created_by_user
FOREIGN KEY (created_by_user_id) REFERENCES users(id)
ON DELETE CASCADE
);

-- =========================================
-- PROJECT MEMBERS
-- =========================================

CREATE TABLE project_user (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

project_id UUID NOT NULL,
user_id UUID NOT NULL,

role project_role NOT NULL DEFAULT 'viewer',

CONSTRAINT fk_project
FOREIGN KEY (project_id) REFERENCES projects(id)
ON DELETE CASCADE,

CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE,

CONSTRAINT unique_project_user UNIQUE (project_id, user_id)
);

-- =========================================
-- PROJECT INVITATIONS
-- =========================================

CREATE TABLE project_invitations (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

project_id UUID NOT NULL,
invited_user_id UUID,
invited_by_user_id UUID NOT NULL,

role project_role NOT NULL DEFAULT 'viewer',
status invite_status NOT NULL DEFAULT 'pending',

responded_at TIMESTAMP WITH TIME ZONE,
expires_at TIMESTAMP WITH TIME ZONE,

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

CONSTRAINT fk_invite_project
FOREIGN KEY (project_id) REFERENCES projects(id)
ON DELETE CASCADE,

CONSTRAINT fk_invited_user
FOREIGN KEY (invited_user_id) REFERENCES users(id)
ON DELETE CASCADE,

CONSTRAINT fk_invited_by_user
FOREIGN KEY (invited_by_user_id) REFERENCES users(id)
ON DELETE CASCADE
);

-- =========================================
-- PROJECT STRUCTURE VERSIONS
-- =========================================

CREATE TABLE project_structure_versions (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

project_id UUID NOT NULL,
version TEXT NOT NULL,

json_code TEXT NOT NULL,
php_code TEXT,

is_current BOOLEAN DEFAULT TRUE,

created_by_user_id UUID NOT NULL,

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

CONSTRAINT fk_structure_project
FOREIGN KEY (project_id) REFERENCES projects(id)
ON DELETE CASCADE,

CONSTRAINT fk_structure_user
FOREIGN KEY (created_by_user_id) REFERENCES users(id)
ON DELETE CASCADE
);

-- =========================================
-- GOOGLE SHEETS CREDENTIALS
-- =========================================

CREATE TABLE google_sheets_credentials (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

project_id UUID NOT NULL UNIQUE,

google_sheet_id TEXT,
google_project_id TEXT,

private_key_id TEXT,
client_email TEXT,
client_id TEXT,
client_x509_cert_url TEXT,

private_key TEXT,

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

CONSTRAINT fk_credentials_project
FOREIGN KEY (project_id) REFERENCES projects(id)
ON DELETE CASCADE
);

-- =========================================
-- INDEXES (Recommended)
-- =========================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_project_user_user_id ON project_user(user_id);
CREATE INDEX idx_project_user_project_id ON project_user(project_id);
CREATE INDEX idx_invitations_project_id ON project_invitations(project_id);

-- =========================================
-- NOTES
-- =========================================

-- 1. private_key MUST be encrypted at application layer
-- 2. Use Supabase Auth → store auth_id
-- 3. Never allow login without checking users table
-- 4. Only one structure version should have is_current = true
