/**
 * Project invitation row model from the project_invitations table.
 */
export interface ProjectInvitationData {
  id: string;
  project_id: string;
  invited_user_id: string;
  role: "viewer" | "editor" | "admin";
  status: "pending" | "accepted" | "declined" | "expired";
  expires_at: string;
  created_at: string;
  updated_at: string;
}
