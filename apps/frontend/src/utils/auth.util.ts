// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

// OTHERS //
import { supabase } from "@/lib/supabase";

/**
 * Resolves the latest available access token for authenticated API requests.
 */
export async function getAccessTokenForApiRequest(): Promise<string> {
  const sessionResponseData = await supabase.auth.getSession();
  const sessionAccessTokenData =
    sessionResponseData.data.session?.access_token ?? null;

  if (sessionAccessTokenData) {
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, sessionAccessTokenData);
    return sessionAccessTokenData;
  }

  const localAccessTokenData = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY);

  if (!localAccessTokenData) {
    throw new Error("Missing access token. Please sign in again.");
  }

  return localAccessTokenData;
}
