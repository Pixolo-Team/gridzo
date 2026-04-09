// TYPES //
import type { AuthSessionResponseData } from "@/types/auth-session";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

// LIBRARIES //
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

/**
 * Sends access token to backend auth session API and returns user session data.
 */
export async function createAuthSessionRequest(
  accessToken: string,
): Promise<AuthSessionResponseData | { data: null; error: Error }> {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${CONSTANTS.LOCAL_API_URL}/auth/session`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.request<AuthSessionResponseData>(config);

    return response.data;
  } catch (errorData: unknown) {
    if (axios.isAxiosError(errorData)) {
      const responseMessageData =
        typeof errorData.response?.data === "object" &&
        errorData.response?.data !== null &&
        "message" in errorData.response.data &&
        typeof (errorData.response.data as { message?: unknown }).message ===
          "string"
          ? (errorData.response.data as { message: string }).message
          : null;

      return {
        data: null,
        error: new Error(responseMessageData ?? "Failed to call auth/session API."),
      };
    }

    return {
      data: null,
      error: new Error("Failed to call auth/session API."),
    };
  }
}
