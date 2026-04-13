/**
 * Project row model from the projects table.
 */
export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string;
  website_url: string | null;
  created_by_user_id: string;
  owner_user_id: string;
  status: "active" | "archived" | "deleted";
  created_at: string;
  updated_at: string;
}

/**
 * Project structure version row model from the project_structure_versions table.
 */
export interface ProjectStructureVersionData {
  id: string;
  project_id: string;
  version: string;
  json_code: Record<string, unknown>;
  php_code: string | null;
  is_current: boolean;
  created_by_user_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Google Sheet credentials row model from the google_sheet_credentials table.
 */
export interface GoogleSheetCredentialsData {
  id: string;
  project_id: string;
  google_sheet_id: string | null;
  google_project_id: string | null;
  private_key_id: string | null;
  client_email: string | null;
  client_id: string | null;
  client_x509_cert_url: string | null;
  private_key: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Payload returned by the create_project_transaction RPC call.
 */
export interface CreateProjectTransactionResultData {
  project: Pick<
    ProjectData,
    "id" | "name" | "slug" | "category" | "website_url" | "status"
  >;
  structure: Pick<
    ProjectStructureVersionData,
    "id" | "version" | "is_current" | "json_code" | "php_code"
  >;
  google_sheet_credentials: Pick<
    GoogleSheetCredentialsData,
    "id" | "google_sheet_id" | "google_project_id" | "client_email"
  >;
}
