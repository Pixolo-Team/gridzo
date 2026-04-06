// REACT //
import type { ReactNode } from "react";

// COMPONENTS //
import InformationCircle from "@/components/icons/neevo-icons/InformationCircle";

interface EditProjectSectionPropsData {
  children: ReactNode;
  title: string;
}

/**
 * Renders a shared edit-project section shell with title, icon, and content
 */
export default function EditProjectSection({
  children,
  title,
}: EditProjectSectionPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="flex flex-col gap-7 xl:gap-10">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <InformationCircle
          primaryColor="var(--color-n-700)"
          className="size-4 md:size-5 shrink-0 lg:size-6"
        />

        {/* Title */}
        <h2 className="text-lg font-bold text-n-950 md:text-xl xl:text-2xl">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}
