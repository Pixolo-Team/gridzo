// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import LineArrowLeft1 from "@/components/icons/neevo-icons/LineArrowLeft1";

type CreateProjectHeaderPropsData = {
  onBackAction: () => void;
};

/**
 * Renders the responsive create-project page header without changing the current layout
 */
export function CreateProjectHeader({
  onBackAction,
}: CreateProjectHeaderPropsData): ReactElement {
  return (
    <>
      <div className="flex items-center justify-between rounded-b-xl bg-n-50 px-7 py-4 md:hidden">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-n-100"
          onClick={onBackAction}
        >
          <LineArrowLeft1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>

        <h1 className="text-base font-semibold text-n-800">
          Create New Project
        </h1>

        <button
          type="button"
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-n-100"
        >
          <HamburgerMenu1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>
      </div>

      <div className="hidden border-b border-n-300 bg-n-50 px-7 py-5 md:block">
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-12 items-center justify-center rounded-lg bg-n-100 transition-colors hover:bg-n-200"
            onClick={onBackAction}
          >
            <LineArrowLeft1
              primaryColor="var(--color-n-500)"
              className="size-6"
            />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[-0.5px] text-n-800">
              Create New Project
            </h1>
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
