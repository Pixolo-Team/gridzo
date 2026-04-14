// Type for Project Structure Data
export type ProjectStructureData = {
  id: string;
  version: string;
  php_code: string | null;
  is_current: boolean;
  json_code: string | Record<string, unknown>;
};

// Type for Project Google Sheet Credentials Data
export type ProjectGoogleSheetCredentialsData = {
  id: string;
  google_sheet_id: string | null;
  google_project_id: string | null;
  client_email: string | null;
};

// Type for Project Data
export type ProjectData = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  website_url: string | null;
  status: "active" | "archived" | "deleted";
};

// Type for Project List Item Data
export type ProjectListItemData = ProjectData & {
  role: "owner" | "admin" | "editor" | "viewer";
  updated_at: string;
};

// Type for Create Project Response Data
export type CreateProjectResponseData = {
  project: ProjectData;
  structure: ProjectStructureData;
  google_sheet_credentials: ProjectGoogleSheetCredentialsData;
};

// Type for Get Project By ID Response Data
export type GetProjectByIdResponseData = {
  project: ProjectData & {
    structure: {
      current_version: ProjectStructureData;
    };
    google_sheet_credentials: ProjectGoogleSheetCredentialsData;
  };
};

// Type for Invite User Response Data
export type InviteUserResponseData = {
  invitation_id: string;
  project_id: string;
  invited_user_id: string;
  role: "viewer" | "editor" | "admin";
  status: "pending" | "accepted" | "declined" | "expired";
  expires_at: string;
};

// Type for Create Project Request Google Sheet Credentials Data
export type CreateProjectRequestGoogleSheetCredentialsData = {
  google_sheet_id: string;
  google_project_id?: string;
  private_key: string;
  private_key_id?: string;
  client_email: string;
  client_id?: string;
  client_x509_cert_url: string | undefined;
};

// Type for Create Project Request Structure Data
export type CreateProjectRequestStructureData = {
  php_code?: string;
  json_code: Record<string, unknown>;
};

// Type for Create Project Request Data
export type CreateProjectRequestData = {
  name: string;
  slug: string;
  category?: string;
  website_url?: string;
  google_sheet_credentials: CreateProjectRequestGoogleSheetCredentialsData;
  structure: CreateProjectRequestStructureData;
};
