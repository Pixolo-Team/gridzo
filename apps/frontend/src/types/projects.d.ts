// Type for Project Structure Data
export type ProjectStructureData = {
  id: string;
  version: string;
  php_code: string | null;
};

// Type for Project Google Sheet Credentials Data
export type ProjectGoogleSheetCredentialsData = {
  id: string;
  google_sheet_id: string | null;
  client_email: string | null;
};

// Type for Project Data
export type ProjectData = {
  id: string;
  name: string;
  status: "active" | "archived" | "deleted";
};

// Type for Create Project Response Data
export type CreateProjectResponseData = {
  project: ProjectData;
  structure: ProjectStructureData;
  google_sheet_credentials: ProjectGoogleSheetCredentialsData;
};

// Type for Create Project Request Google Sheet Credentials Data
export type CreateProjectRequestGoogleSheetCredentialsData = {
  google_sheet_id: string;
  google_project_id?: string;
  private_key: string;
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
