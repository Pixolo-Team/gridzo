/**
 * ProjectUser row model from the project_user table.
 */
export interface ProjectUserData {
  id: string;
  project_id: string;
  user_id: string;
  role: "owner" | "admin" | "editor" | "viewer";
}

/**
 * ProjectInvitation row model from the project_invitations table.
 */
export interface ProjectInvitationData {
  id: string;
  project_id: string;
  invited_user_id: string | null;
  invited_by_user_id: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "pending" | "accepted" | "rejected" | "expired" | "revoked";
  responded_at: string | null;
  expires_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Summary payload returned to the client after a successful invitation.
 */
export interface ProjectInvitationSummaryData {
  invitation_id: string;
  project_id: string;
  invited_user_id: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "pending" | "accepted" | "rejected" | "expired" | "revoked";
  expires_at: string | null;
}
