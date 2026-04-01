// COMPONENTS //
import Link from "next/link";
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import LineArrowLeft1 from "@/components/icons/neevo-icons/LineArrowLeft1";
import { Button } from "@/components/ui/button";
import HeaderShell from "@/components/layouts/headers/HeaderShell";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

interface FlowHeaderPropsData {
  onToggleMobileMenu: () => void;
}

/**
 * Renders the create-project flow header
 */
export default function FlowHeader({
  onToggleMobileMenu,
}: FlowHeaderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <HeaderShell>
      {/* Desktop Flow Header */}
      <div className="hidden md:block">
        {/* Back Row */}
        <div className="border-b border-n-300 px-7 py-5">
          <Link
            href={ROUTES.APP.DASHBOARD}
            className="inline-flex items-center gap-3 text-base font-semibold text-n-600 transition-colors hover:text-n-800"
          >
            <LineArrowLeft1
              primaryColor="var(--color-n-500)"
              className="size-5"
            />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Title Row */}
        <div className="px-7 py-5">
          <div className="flex items-center gap-2">
            {/* Title */}
            <h1 className="text-xl font-bold tracking-[-0.5px] text-n-800">
              Create New Project
            </h1>
            {/* Status Badge */}
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
              In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Flow Header */}
      <div className="flex items-center justify-between rounded-b-xl px-7 py-3.5 md:hidden">
        <Link
          href={ROUTES.APP.DASHBOARD}
          aria-label="Back to Projects"
          className="flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-n-100"
        >
          <LineArrowLeft1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </Link>

        <h1 className="text-base font-semibold text-n-800">
          Create New Project
        </h1>

        {/* Menu Trigger */}
        <Button
          type="button"
          aria-label="Open side menu"
          variant="ghost"
          className="size-11 rounded-full p-0 hover:bg-n-100"
          onClick={onToggleMobileMenu}
        >
          <HamburgerMenu1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </Button>
      </div>
    </HeaderShell>
  );
}
