/**
 * Project row model from the projects table.
 */
export interface ProjectData {
  id: string;
  name: string;
  category: string | null;
  website_url: string | null;
  slug: string;
  created_by_user_id: string;
  owner_user_id: string;
  status: "active" | "archived" | "deleted";
  created_at: string;
  updated_at: string;
}

/**
 * Project user membership row model from the project_user table.
 */
export interface ProjectUserData {
  project_id: string;
  user_id: string;
  role: "owner" | "admin" | "editor" | "viewer";
}

/**
 * Google sheet credentials row model from the google_sheet_credentials table.
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
 * Input payload for editing a project.
 */
export interface EditProjectPayloadData {
  name?: string;
  category?: string;
  website_url?: string;
  google_sheet_credentials?: {
    google_sheet_id: string;
    google_project_id?: string;
    private_key_id?: string;
    client_email: string;
    client_id?: string;
    client_x509_cert_url?: string;
    private_key: string;
  };
}

/**
 * Safe response data returned after editing a project.
 */
export interface EditProjectResponseData {
  project: Pick<
    ProjectData,
    "id" | "name" | "slug" | "category" | "website_url" | "status" | "updated_at"
  >;
  google_sheet_credentials: Pick<
    GoogleSheetCredentialsData,
    "id" | "google_sheet_id" | "google_project_id" | "client_email"
  > | null;
}
