// REACT //
import type { ReactElement, ReactNode } from "react";

type MobileBottomActionsPropsData = {
  children: ReactNode;
};

/**
 * Renders the shared mobile-only fixed bottom actions container
 */
export function MobileBottomActions({
  children,
}: MobileBottomActionsPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-n-100 px-6 py-6 md:hidden">
      {/* Bottom Actions Content */}
      <div className="mx-auto container flex w-full items-start justify-center gap-4">
        {children}
      </div>
    </div>
  );
}
