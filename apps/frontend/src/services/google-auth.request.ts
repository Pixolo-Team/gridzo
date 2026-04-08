import { createClient } from "@supabase/supabase-js";

interface GoogleAuthRequestResponseData {
  data: null;
  error: Error | null;
}

/**
 * Starts Google OAuth login via Supabase.
 */
export async function signInWithGoogleRequest(
  redirectTo: string,
): Promise<GoogleAuthRequestResponseData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      data: null,
      error: new Error("Missing Supabase environment variables"),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    return { data: null, error };
  }

  return { data: null, error: null };
}
