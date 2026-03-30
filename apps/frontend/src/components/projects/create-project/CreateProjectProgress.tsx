// REACT //
import type { ReactElement } from "react";

// TYPES //
import type { CreateProjectStepData } from "@/components/projects/create-project/create-project.data";

// UTILS //
import { cn } from "@/lib/utils";

type CreateProjectProgressPropsData = {
  activeStep: number;
  progressWidthClassName: string;
  stepData: CreateProjectStepData;
};

/**
 * Renders the create-project step heading, description, and progress bar
 */
export function CreateProjectProgress({
  activeStep,
  progressWidthClassName,
  stepData,
}: CreateProjectProgressPropsData): ReactElement {
  return (
    <div className="flex w-full flex-col gap-5">
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

        <div className="mt-4 h-2 w-full rounded-full bg-n-200 md:mt-3">
          <div
            className={cn(
              "h-full rounded-full bg-n-800",
              progressWidthClassName,
            )}
          />
        </div>
      </div>

      {activeStep === 3 ? (
        <div className="flex flex-wrap items-center gap-1.5 text-xs leading-[1.55] text-n-500 md:text-sm">
          <span>Paste the content of your</span>
          <span className="rounded bg-n-200 px-1 py-0.5 font-mono text-[#1a2b3d]">
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
