// REACT //
import type { ReactNode } from "react";

interface MobileBottomActionsPropsData {
  children: ReactNode;
}

/**
 * Renders the shared mobile and tablet fixed bottom actions container
 */
export default function MobileBottomActions({
  children,
}: MobileBottomActionsPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-n-100 px-6 py-6 xl:hidden">
      {/* Bottom Actions Content */}
      <div className="mx-auto container flex w-full items-start justify-center gap-4">
        {children}
      </div>
    </div>
  );
}
