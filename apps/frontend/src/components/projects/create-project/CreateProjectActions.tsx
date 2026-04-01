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
  /**
   * Gets the shared action width classes so step actions scale by available width
   */
  const getActionWidthClassName = (): string => {
    return "w-auto min-w-[32%] md:min-w-[24%] lg:min-w-[18%]";
  };

  // Use Effects

  return (
    <div className="flex w-full flex-wrap justify-end gap-3 md:gap-5">
      {/* Back Action */}
      {onBackAction ? (
        <Button
          type="button"
          size="small"
          variant="secondary"
          className={`${getActionWidthClassName()} px-6 text-base md:px-8 md:text-lg`}
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
        className={`${getActionWidthClassName()} px-6 text-base md:px-8 md:text-lg`}
        onClick={onNextAction}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
