"use client";

// REACT //
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/** Home Page */
export default function HomePage() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const { user, isLoading } = useAuthContext();

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    router.replace(ROUTES.APP.DASHBOARD);
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-n-700">Loading user session...</p>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return null;
}
