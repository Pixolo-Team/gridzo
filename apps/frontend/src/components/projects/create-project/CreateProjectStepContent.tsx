// TYPES //
import type { CreateProjectStepData } from "@/types/create-project";

// COMPONENTS //
import CreateProjectActions from "@/components/projects/create-project/CreateProjectActions";
import CreateProjectStepFields from "@/components/projects/create-project/CreateProjectStepFields";

interface CreateProjectStepContentPropsData {
  createProjectFormData: Record<string, string>;
  onBackAction?: () => void;
  onNextAction: () => void;
  onValueChange: (fieldId: string, value: string) => void;
  stepData: CreateProjectStepData;
}

/**
 * Renders a single create-project step from the shared step configuration
 */
export default function CreateProjectStepContent({
  createProjectFormData,
  onBackAction,
  onNextAction,
  onValueChange,
  stepData,
}: CreateProjectStepContentPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="flex w-full flex-col items-end gap-7 md:gap-8">
      {/* Step Fields */}
      <CreateProjectStepFields
        createProjectFormData={createProjectFormData}
        fieldGroupItems={stepData.fieldGroupItems}
        onValueChange={onValueChange}
      />

      {/* Step Actions */}
      <CreateProjectActions
        nextLabel={stepData.nextLabel}
        onBackAction={stepData.showBackAction ? onBackAction : undefined}
        onNextAction={onNextAction}
      />
    </div>
  );
}
