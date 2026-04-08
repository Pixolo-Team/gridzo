"use client";

// REACT //
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// LIBRARIES //
import { supabase } from "@/lib/supabase";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/** Auth callback page that exchanges OAuth code and redirects authenticated users */
export default function AuthCallbackPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs
  const hasFetchedRef = useRef<boolean>(false);

  // Define States

  // Helper Functions
  /**
   * Exchanges the OAuth code for a session and redirects home
   */
  const handleAuthCallback = async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (!code) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      router.replace(ROUTES.APP.HOME);
    } catch {
      // Any unexpected callback failure should safely return the user to login.
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  // Use Effects
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
