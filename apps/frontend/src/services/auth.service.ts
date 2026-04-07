// TYPES //
import type { AuthError, OAuthResponse } from "@supabase/supabase-js";

// LIBRARIES //
import { supabase } from "@/lib/supabase";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/**
 * Initiates Google OAuth sign-in flow via Supabase
 */
export async function signInWithGoogleRequest(): Promise<
  OAuthResponse | { data: null; error: AuthError }
> {
  // Trigger Google OAuth flow via Supabase Auth
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${ROUTES.AUTH.CALLBACK}`,
    },
  });

  return response;
}
