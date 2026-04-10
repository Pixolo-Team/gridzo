/**
 * Project row model from the projects table.
 */
export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string;
  website_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Project structure version row model from the project_structure_versions table.
 */
export interface ProjectStructureVersionData {
  id: string;
  version: string;
  is_current: boolean;
  json_code: Record<string, unknown> | null;
  php_code: string | null;
}

/**
 * Safe Google Sheet credential fields (no secrets) from the google_sheets_credentials table.
 */
export interface GoogleSheetCredentialData {
  id: string;
  google_sheet_id: string;
  google_project_id: string;
  client_email: string;
}

/**
 * Full project details payload returned to authenticated project members.
 */
export interface ProjectDetailsPayloadData {
  project: ProjectData;
  structure: {
    current_version: ProjectStructureVersionData | null;
  };
  google_sheet_credentials: GoogleSheetCredentialData | null;
}
