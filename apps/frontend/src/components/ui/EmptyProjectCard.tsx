// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import Add1 from "@/components/icons/neevo-icons/Add1";
import Link from "next/link";

type EmptyProjectCardPropsData = {
  href: string;
};

/**
 * Renders the empty create-project card for the dashboard
 */
export function EmptyProjectCard({
  href,
}: EmptyProjectCardPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <Link
      href={href}
      className="flex min-h-80 flex-col items-center justify-center gap-7 rounded-2xl border-2 border-dashed border-n-300 px-6 py-8 text-center transition-colors hover:border-n-400 hover:bg-n-50"
    >
      {/* Add Icon */}
      <div className="flex size-9 items-center justify-center rounded-full bg-n-200">
        <Add1 primaryColor="var(--color-n-500)" className="size-5" />
      </div>

      {/* Empty State Content */}
      <div className="flex w-full flex-col gap-1.5">
        <h2 className="text-2xl font-bold text-n-950">Create New Project</h2>
        <p className="text-sm text-n-500">Deploy a new site or application</p>
      </div>
    </Link>
  );
}
