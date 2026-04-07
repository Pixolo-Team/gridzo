// LIBRARIES //
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase project URL and anon key from environment variables
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase browser client instance, initialised from
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.
 * Used exclusively for client-side OAuth flows (e.g. Google sign-in).
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
