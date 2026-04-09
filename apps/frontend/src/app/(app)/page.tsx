"use client";

// REACT //
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// TYPES //
import type { UserData } from "@/types/user";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";
import { ROUTES } from "@/app/constants/routes";

/** Home Page */
export default function HomePage() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs
  const hasLoadedRef = useRef<boolean>(false);

  // Define States
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper Functions
  /**
   * Loads the authenticated user payload from local storage.
   */
  const loadStoredUserService = (): void => {
    const storedUserData = window.localStorage.getItem(CONSTANTS.AUTH_USER_STORAGE_KEY);

    if (!storedUserData) {
      setIsLoading(false);
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    try {
      const parsedUserData = JSON.parse(storedUserData) as UserData;
      setUserData(parsedUserData);
      setIsLoading(false);
    } catch {
      window.localStorage.removeItem(CONSTANTS.AUTH_USER_STORAGE_KEY);
      setIsLoading(false);
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  // Use Effects
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    loadStoredUserService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-n-700">Loading user session...</p>
      </section>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-8">
      <div className="w-full max-w-xl rounded-xl border border-n-300 bg-n-50 p-6">
        <h1 className="mb-4 text-2xl font-semibold text-n-950">Welcome back</h1>
        <div className="space-y-2 text-sm text-n-800">
          <p>
            <span className="font-medium text-n-900">Name:</span>{" "}
            {userData.full_name ?? "N/A"}
          </p>
          <p>
            <span className="font-medium text-n-900">Email:</span> {userData.email}
          </p>
          <p>
            <span className="font-medium text-n-900">Status:</span> {userData.status}
          </p>
        </div>
      </div>
    </section>
  );
}
