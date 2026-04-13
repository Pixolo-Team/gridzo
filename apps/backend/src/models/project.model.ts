/**
 * Project user row model from the project_user table.
 */
export interface ProjectUserData {
  project_id: string;
  user_id: string;
  role: string;
}

/**
 * Project structure version row model from the project_structure_versions table.
 */
export interface ProjectStructureVersionData {
  id: string;
  project_id: string;
  version: string;
  json_code: Record<string, unknown>;
  php_code: string;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}
