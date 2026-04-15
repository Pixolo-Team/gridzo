/**
 * Project row model from the projects table.
 */
export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  website_url: string | null;
  created_by_user_id: string;
  owner_user_id: string;
  status: "active" | "archived" | "deleted";
  created_at: string;
  updated_at: string;
}

/**
 * Project with role payload returned for authenticated clients.
 */
export interface ProjectWithRoleData extends ProjectData {
  role: "owner" | "admin" | "editor" | "viewer";
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

/**
 * Payload returned by GET /project/{projectId}.
 */
export interface ProjectByIdResultData {
  project: {
    id: string;
    name: string;
    slug: string;
    category: string | null;
    website_url: string | null;
    status: "active" | "archived" | "deleted";
    structure: {
      current_version: {
        id: string;
        version: string;
        is_current: boolean;
        json_code: Record<string, unknown>;
        php_code: string | null;
      };
    };
    google_sheet_credentials: {
      id: string;
      google_sheet_id: string | null;
      google_project_id: string | null;
      client_email: string | null;
      private_key_id: string | null;
      client_id: string | null;
      client_x509_cert_url: string | null;
      private_key: string | null;
    };
  };
}

/**
 * Project user row model from project_user join users.
 */
export interface ProjectUserData {
  id: string;
  email: string;
  full_name: string | null;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "invited" | "active" | "disabled" | "inactive";
}

/**
 * Pending invitation row model for get-all-users response.
 */
export interface ProjectPendingInvitationData {
  id: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "pending";
}

/**
 * Combined response payload for project users and invitations.
 */
export interface ProjectUsersPayloadData {
  users: ProjectUserData[];
  invitations: ProjectPendingInvitationData[];
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
 * Safe response payload returned after editing a project.
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
