// TYPES //
import type { AuthSessionResponseData } from "@/types/auth-session";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

/**
 * Sends access token to backend auth session API and returns user session data.
 */
export async function createAuthSessionRequest(
  accessTokenData: string,
): Promise<AuthSessionResponseData | { data: null; error: Error }> {
  try {
    const response = await fetch(`${CONSTANTS.LOCAL_API_URL}/auth/session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessTokenData}`,
      },
    });

    const responseData = (await response.json()) as AuthSessionResponseData;

    if (!response.ok) {
      return {
        data: null,
        error: new Error(responseData.message),
      };
    }

    return responseData;
  } catch {
    return {
      data: null,
      error: new Error("Failed to call auth/session API."),
    };
  }
}
