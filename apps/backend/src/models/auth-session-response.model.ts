// TYPES //
import type { UserData } from "@/models/user.model";

/**
 * Auth session success response model returned to authenticated clients.
 */
export interface AuthSessionSuccessResponseData {
  status: "success";
  status_code: 200;
  message: "User authenticated successfully";
  error: null;
  data: {
    token: string;
    user: Pick<UserData, "id" | "email" | "full_name" | "avatar_url" | "status">;
  };
}
