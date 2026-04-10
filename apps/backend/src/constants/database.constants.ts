/**
 * Centralized Supabase table names for safe and consistent queries.
 */
export const tables = {
  USERS: "users",
  PROJECTS: "projects",
  PROJECT_USER: "project_user",
  PROJECT_STRUCTURE_VERSIONS: "project_structure_versions",
  GOOGLE_SHEETS_CREDENTIALS: "google_sheets_credentials",
} as const;
