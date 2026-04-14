/**
 * User row model from the users table.
 */
export interface UserData {
  id: string;
  auth_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  status: "invited" | "active" | "disabled" | "inactive";
}
