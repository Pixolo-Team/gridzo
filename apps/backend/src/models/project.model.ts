/**
 * Project row model from the projects table.
 */
export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  website_url: string | null;
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
