// TYPES //
import type { AuthError, OAuthResponse } from "@supabase/supabase-js";

// LIBRARIES //
import { supabase } from "@/lib/supabase";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

type GoogleSignInResponseData = OAuthResponse | { data: null; error: AuthError };

/**
 * Initiates Google OAuth sign-in flow via Supabase.
 */
export async function signInWithGoogleRequest(): Promise<GoogleSignInResponseData> {
  try {
    // Trigger Google OAuth flow via Supabase Auth
    const googleSignInResponseData = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${ROUTES.AUTH.CALLBACK}`,
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
