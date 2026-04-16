// REACT //
import type { ReactNode } from "react";

// COMPONENTS //
import Flash2 from "@/components/icons/neevo-icons/Flash2";
import MobileBottomActions from "@/components/layouts/MobileBottomActions";
import NotificationButton from "@/components/ui/NotificationButton";
import { Button } from "@/components/ui/button";

/**
 * Renders the structure route layout with bottom project actions on mobile and tablet.
 */
export default function ProjectStructureLayout({
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
      {/* Structure Content */}
      <div className="min-h-full pb-36 xl:pb-0">{children}</div>

      {/* Bottom Actions */}
      <MobileBottomActions>
        <Button
          type="button"
          size="small"
          variant="success"
          className="h-12 flex-1 rounded-xl text-base"
        >
          <Flash2 primaryColor="var(--color-n-50)" className="size-5" />
          <span>Deploy Now</span>
        </Button>

        <NotificationButton />
      </MobileBottomActions>
    </>
  );
}

