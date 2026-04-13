/**
 * Project user row model from the project_user table.
 */
export interface ProjectUserData {
  id: string;
  email: string;
  full_name: string | null;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "invited" | "active" | "disabled" | "inactive";
}

/**
 * Project invitation row model from the project_invitations table.
 */
export interface ProjectInvitationData {
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
  invitations: ProjectInvitationData[];
}
