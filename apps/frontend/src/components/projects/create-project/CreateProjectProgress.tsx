// TYPES //
import type { CreateProjectStepData } from "@/types/create-project";

// COMPONENTS //
import ProgressBar from "@/components/ui/progress-bar";

interface CreateProjectProgressPropsData {
  activeStep: number;
  stepData: CreateProjectStepData;
}

/**
 * Renders the create-project step heading, description, and progress bar
 */
export function CreateProjectProgress({
  activeStep,
  stepData,
}: CreateProjectProgressPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  const progressValue = activeStep === 1 ? 33 : activeStep === 2 ? 66 : 100;

  // Use Effects

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Progress Header */}
      <div className="flex flex-col gap-4 md:gap-0">
        <div className="flex items-end justify-between gap-4">
          <div className="text-n-800">
            <p className="text-[20px] leading-7 md:hidden">
              {stepData.stepLabel}:
            </p>
            <p className="text-[20px] leading-7 font-bold md:hidden">
              {stepData.title}
            </p>

            <p className="hidden text-3xl md:block">
              <span className="font-normal">{stepData.stepLabel}:</span>{" "}
              <span className="font-bold">{stepData.title}</span>
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium text-n-500 md:text-base">
            {stepData.percentageLabel}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar className="mt-4 md:mt-3" value={progressValue} />
      </div>

      {/* Step Description */}
      {activeStep === 3 ? (
        <div className="flex flex-wrap items-center gap-1.5 text-xs leading-[1.55] text-n-500 md:text-sm">
          <span>Paste the content of your</span>
          <span className="rounded bg-n-200 px-1 py-0.5 font-mono text-n-800">
            structure.php
          </span>
          <span>file here to define how the sheet data is mapped</span>
        </div>
      ) : (
        <p className="text-xs leading-[1.35] text-n-500 md:text-sm">
          {stepData.description}
        </p>
      )}
    </div>
  );
}
