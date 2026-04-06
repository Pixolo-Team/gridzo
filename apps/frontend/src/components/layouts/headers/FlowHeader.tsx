// NAVIGATION //
import { useRouter } from "next/navigation";

// COMPONENTS //
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import LineArrowLeft1 from "@/components/icons/neevo-icons/LineArrowLeft1";
import { Button } from "@/components/ui/button";
import HeaderShell from "@/components/layouts/headers/HeaderShell";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

interface FlowHeaderPropsData {
  isProjectCreated?: boolean;
  onBackAction?: (() => void) | null;
  onToggleMobileMenu: () => void;
}

/**
 * Renders the create-project flow header
 */
export default function FlowHeader({
  isProjectCreated = false,
  onBackAction = null,
  onToggleMobileMenu,
}: FlowHeaderPropsData) {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Handles the flow back action using the shared step navigation when available
   */
  const handleBackAction = (): void => {
    if (onBackAction) {
      onBackAction();
      return;
    }

    router.push(ROUTES.APP.DASHBOARD);
  };

  // Use Effects

  return (
    <HeaderShell>
      {/* Desktop Flow Header */}
      <div className="hidden md:block">
        {isProjectCreated ? (
          <div className="border-b border-n-300 px-7 py-5">
            <div className="flex items-center gap-5">
              <Button
                type="button"
                aria-label="Back to Projects"
                variant="ghost"
                className="size-12 rounded-lg bg-n-100 p-0 hover:bg-n-200"
                onClick={handleBackAction}
              >
                <LineArrowLeft1
                  primaryColor="var(--color-n-500)"
                  className="size-6"
                />
              </Button>

              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-[-0.5px] text-n-800">
                  Create New Project
                </h1>
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
                  Project Created
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Back Row */}
            <div className="border-b border-n-300 px-7 py-5">
              <button
                type="button"
                className="inline-flex items-center gap-3 text-base font-semibold text-n-600 transition-colors hover:text-n-800"
                onClick={handleBackAction}
              >
                <LineArrowLeft1
                  primaryColor="var(--color-n-500)"
                  className="size-5"
                />
                <span>Back to Projects</span>
              </button>
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
          </>
        )}
      </div>

      {/* Mobile Flow Header */}
      <div className="flex items-center justify-between rounded-b-xl px-7 py-3.5 md:hidden">
        <button
          type="button"
          aria-label="Back to Projects"
          className="flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-n-100"
          onClick={handleBackAction}
        >
          <LineArrowLeft1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>

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
