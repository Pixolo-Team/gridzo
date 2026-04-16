// TYPES //
import type { AuthError, OAuthResponse } from "@supabase/supabase-js";

// LIBRARIES //
import { supabase } from "@/lib/supabase";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

type GoogleSignInResponseData =
  | OAuthResponse
  | { data: null; error: AuthError };

/**
 * Resolves OAuth callback base URL from env first, then browser origin.
 */
const getOAuthRedirectBaseUrlService = (): string => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (appUrl) {
    return appUrl.replace(/\/+$/, "");
  }

  return window.location.origin;
};

/**
 * Initiates Google OAuth sign-in flow via Supabase.
 */
export async function signInWithGoogleRequest(): Promise<GoogleSignInResponseData> {
  try {
    const redirectBaseUrl = getOAuthRedirectBaseUrlService();

    // Trigger Google OAuth flow via Supabase Auth
    const googleSignInResponseData = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectBaseUrl}${ROUTES.AUTH.CALLBACK}`,
      },
    });

    return googleSignInResponseData;
  } catch {
    // Return a predictable auth-style error object for UI handling.
    return {
      data: null,
      error: {
        name: "AuthError",
        message: "Failed to start Google authentication.",
      } as AuthError,
    };
  }
}
