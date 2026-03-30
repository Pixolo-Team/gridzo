// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";

type CreateProjectActionsPropsData = {
  nextLabel: string;
  onBackAction?: () => void;
  onNextAction: () => void;
};

/**
 * Renders the shared trailing actions for multi-step create-project states
 */
export function CreateProjectActions({
  nextLabel,
  onBackAction,
  onNextAction,
}: CreateProjectActionsPropsData): ReactElement {
  return (
    <div className="flex w-full justify-end gap-3 md:gap-5">
      {onBackAction ? (
        <Button
          type="button"
          size="small"
          variant="secondary"
          className="px-8 text-base md:text-lg"
          onClick={onBackAction}
        >
          Back
        </Button>
      ) : null}

      <Button
        type="button"
        size="small"
        variant="primary"
        className="px-8 text-base md:text-lg"
        onClick={onNextAction}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
