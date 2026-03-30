// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import BellNotification from "@/components/icons/neevo-icons/BellNotification";
import { Button } from "@/components/ui/button";

/**
 * Renders the shared notification icon button
 */
export function NotificationButton(): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <>
      {/* Notification Trigger */}
      <Button
        type="button"
        aria-label="Notifications"
        variant="secondary"
        className="size-12 rounded-[26px] border-n-300 bg-n-50 p-0 hover:bg-n-100"
      >
        {/* Notification Icon */}
        <BellNotification
          primaryColor="var(--color-n-700)"
          className="size-5"
        />
      </Button>
    </>
  );
}
