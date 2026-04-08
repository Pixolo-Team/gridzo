// LIBRARIES //
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase project URL and anon key from environment variables
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishableKey: string =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
  );
}

declare global {
  // Keep a single browser client instance across HMR reloads in development.
  // eslint-disable-next-line no-var
  var __supabaseClient__: SupabaseClient | undefined;
}

/**
 * Supabase browser client instance, initialised from
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY env vars.
 * Used exclusively for client-side OAuth flows (e.g. Google sign-in).
 */
export const supabase: SupabaseClient =
  globalThis.__supabaseClient__ ??
  createClient(supabaseUrl, supabasePublishableKey);

if (process.env.NODE_ENV !== "production") {
  globalThis.__supabaseClient__ = supabase;
}
