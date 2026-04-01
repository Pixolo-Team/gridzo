// COMPONENTS //
import { Button } from "@/components/ui/button";

interface CreateProjectActionsPropsData {
  nextLabel: string;
  onBackAction?: () => void;
  onNextAction: () => void;
}

/**
 * Renders the shared trailing actions for multi-step create-project states
 */
export default function CreateProjectActions({
  nextLabel,
  onBackAction,
  onNextAction,
}: CreateProjectActionsPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="flex w-full justify-end gap-3 md:gap-5">
      {/* Back Action */}
      {onBackAction ? (
        <Button
          type="button"
          size="small"
          variant="secondary"
          className="min-w-[104px] px-8 text-base md:min-w-[92px] md:text-lg"
          onClick={onBackAction}
        >
          Back
        </Button>
      ) : null}

      {/* Next Action */}
      <Button
        type="button"
        size="small"
        variant="primary"
        className="min-w-[132px] px-8 text-base md:min-w-[151px] md:text-lg"
        onClick={onNextAction}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
