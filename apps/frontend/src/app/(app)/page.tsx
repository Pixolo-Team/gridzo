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
    if (!isLoading && !user) {
      router.replace(ROUTES.AUTH.LOGIN);
    }
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

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-8">
      <div className="w-full max-w-xl rounded-xl border border-n-300 bg-n-50 p-6">
        <h1 className="mb-4 text-2xl font-semibold text-n-950">Welcome back</h1>
        <div className="space-y-2 text-sm text-n-800">
          <p>
            <span className="font-medium text-n-900">Name:</span>{" "}
            {user.full_name ?? "N/A"}
          </p>
          <p>
            <span className="font-medium text-n-900">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium text-n-900">Status:</span>{" "}
            {user.status}
          </p>
        </div>
      </div>
    </section>
  );
}
