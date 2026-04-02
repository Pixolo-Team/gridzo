// REACT //
import type { ReactNode } from "react";

// COMPONENTS //
import Flash2 from "@/components/icons/neevo-icons/Flash2";
import { MobileBottomActions } from "@/components/layouts/MobileBottomActions";
import NotificationButton from "@/components/ui/NotificationButton";
import { Button } from "@/components/ui/button";

/**
 * Renders the overview route layout with mobile-only project actions
 */
export default function ProjectOverviewLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <>
      {/* Overview Content */}
      <div className="min-h-full pb-36 md:pb-0">{children}</div>

      {/* Mobile Bottom Actions */}
      <MobileBottomActions>
        {/* Deploy Now Button */}
        <Button
          type="button"
          size="small"
          variant="success"
          className="h-12 flex-1 rounded-xl text-base"
        >
          <Flash2 primaryColor="var(--color-n-50)" className="size-5" />
          <span>Deploy Now</span>
        </Button>

        {/* Notification Button */}
        <NotificationButton />
      </MobileBottomActions>
    </>
  );
}
