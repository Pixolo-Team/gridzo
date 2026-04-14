// MODELS //
import type { UserData } from "@/models/user.model";

/**
 * Auth session payload model returned for authenticated clients.
 */
export interface AuthSessionPayloadData {
  token: string;
  user: Pick<UserData, "id" | "email" | "full_name" | "avatar_url" | "status">;
}
