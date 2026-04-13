/**
 * Centralized Supabase table names for safe and consistent queries.
 */
export const tables = {
  USERS: "users",
  PROJECTS: "projects",
  PROJECT_USER: "project_user",
  GOOGLE_SHEET_CREDENTIALS: "google_sheet_credentials",
  PROJECT_STRUCTURE_VERSIONS: "project_structure_versions",
} as const;

/**
 * Centralized Supabase RPC function names for safe and consistent calls.
 */
export const rpcFunctions = {
  CREATE_PROJECT_TRANSACTION: "create_project_transaction",
} as const;
