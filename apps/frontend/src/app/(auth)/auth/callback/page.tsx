"use client";

// REACT //
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// LIBRARIES //
import { supabase } from "@/lib/supabase";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/** Auth callback page – handles OAuth redirect and logs session data */
export default function AuthCallbackPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs
  const hasFetchedRef = useRef<boolean>(false);

  // Define States

  // Helper Functions
  /**
   * Exchanges the OAuth code for a session and redirects to the dashboard
   */
  const handleAuthCallback = async (): Promise<void> => {
    // Retrieve the active session after OAuth redirect
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    // Log auth response as specified in the feature requirements
    console.log(data);

    router.replace(ROUTES.APP.DASHBOARD);
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
