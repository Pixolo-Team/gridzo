/**
 * Centralized Supabase table names for safe and consistent queries.
 */
export const tables = {
  USERS: "users",
  PROJECTS: "projects",
  PROJECT_USER: "project_user",
  GOOGLE_SHEET_CREDENTIALS: "google_sheet_credentials",
} as const;
