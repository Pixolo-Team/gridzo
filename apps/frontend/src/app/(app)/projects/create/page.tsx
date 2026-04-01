"use client";

// REACT //
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CreateProjectActions from "@/components/projects/create-project/CreateProjectActions";
import CreateProjectField from "@/components/projects/create-project/CreateProjectField";
import { CreateProjectProgress } from "@/components/projects/create-project/CreateProjectProgress";
import {
  createProjectStepItems,
  createProjectStepOneFieldItems,
  createProjectStepTwoPrimaryFieldItems,
  createProjectStepTwoSecondaryFieldItems,
  createProjectStructurePhpContent,
  type CreateProjectStepData,
} from "@/components/projects/create-project/create-project.data";

// CONTEXTS //
import { useCreateProjectFlowContext } from "@/contexts/create-project-flow.context";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/**
 * Renders the create project page flow with three UI-only setup steps
 */
export default function CreateProjectPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const { registerBackAction } = useCreateProjectFlowContext();

  // Define Refs

  // Define States
  const [activeStep, setActiveStep] = useState<number>(1);
  const [createProjectFormData, setCreateProjectFormData] = useState<
    Record<string, string>
  >({
    "client-email": "",
    "client-id": "",
    "client-x509-cert-url": "",
    "google-sheet-id": "",
    "private-key": "",
    "private-key-id": "",
    "project-category": "",
    "project-id": "",
    "project-name": "",
    slug: "",
    "structure-php-content": createProjectStructurePhpContent,
    "website-url": "",
  });

  // Helper Functions
  /**
   * Gets the current step content metadata
   */
  const getCurrentCreateProjectStep = (): CreateProjectStepData => {
    return createProjectStepItems[activeStep - 1];
  };

  /**
   * Checks whether the current step is the last create-project step
   */
  const checkIsFinalCreateProjectStep = (): boolean => {
    return activeStep === createProjectStepItems.length;
  };

  /**
   * Updates a single create-project form field value
   */
  const handleCreateProjectFieldValueChange = (
    fieldId: string,
    value: string,
  ): void => {
    setCreateProjectFormData((previousCreateProjectFormData) => ({
      ...previousCreateProjectFormData,
      [fieldId]: value,
    }));
  };

  /**
   * Navigates to the previous step or back to the dashboard from the first step
   */
  const handleBackAction = useCallback((): void => {
    if (activeStep === 1) {
      router.push(ROUTES.APP.DASHBOARD);
      return;
    }

    setActiveStep((previousActiveStep) => previousActiveStep - 1);
  }, [activeStep, router]);

  /**
   * Navigates to the next step or completes the UI flow on the final step
   */
  const handleNextAction = (): void => {
    if (checkIsFinalCreateProjectStep()) {
      router.push(ROUTES.APP.DASHBOARD);
      return;
    }

    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  };

  /**
   * Renders the current step form area
   */
  const renderCreateProjectStepContent = () => {
    if (activeStep === 1) {
      return renderCreateProjectStepOneContent();
    }

    if (activeStep === 2) {
      return renderCreateProjectStepTwoContent();
    }

    return renderCreateProjectStepThreeContent();
  };

  /**
   * Renders the first step fields
   */
  const renderCreateProjectStepOneContent = () => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step One Fields */}
        <div className="flex w-full flex-col gap-7 md:gap-8">
          {createProjectStepOneFieldItems.map((createProjectFieldItem) => (
            <CreateProjectField
              key={createProjectFieldItem.id}
              {...createProjectFieldItem}
              value={createProjectFormData[createProjectFieldItem.id] ?? ""}
              onValueChange={handleCreateProjectFieldValueChange}
            />
          ))}
        </div>

        {/* Step One Action */}
        <Button
          type="button"
          size="small"
          variant="primary"
          className="w-[160px] text-base md:w-auto md:px-8 md:text-lg"
          onClick={handleNextAction}
        >
          Next Step
        </Button>
      </div>
    );
  };

  /**
   * Renders the second step fields
   */
  const renderCreateProjectStepTwoContent = () => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step Two Grid Fields */}
        <div className="grid w-full gap-7 md:grid-cols-2 md:gap-x-7 md:gap-y-8">
          {createProjectStepTwoPrimaryFieldItems.map(
            (createProjectFieldItem) => (
              <CreateProjectField
                key={createProjectFieldItem.id}
                {...createProjectFieldItem}
                value={createProjectFormData[createProjectFieldItem.id] ?? ""}
                onValueChange={handleCreateProjectFieldValueChange}
              />
            ),
          )}
        </div>

        {/* Step Two Full Width Fields */}
        <div className="flex w-full flex-col gap-7 md:gap-8">
          {createProjectStepTwoSecondaryFieldItems.map(
            (createProjectFieldItem) => (
              <CreateProjectField
                key={createProjectFieldItem.id}
                {...createProjectFieldItem}
                value={createProjectFormData[createProjectFieldItem.id] ?? ""}
                onValueChange={handleCreateProjectFieldValueChange}
              />
            ),
          )}
        </div>

        {/* Step Two Actions */}
        <CreateProjectActions
          nextLabel="Next Step"
          onBackAction={handleBackAction}
          onNextAction={handleNextAction}
        />
      </div>
    );
  };

  /**
   * Renders the third step fields
   */
  const renderCreateProjectStepThreeContent = () => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step Three Editor */}
        <div className="flex w-full flex-col gap-2.5 md:gap-3">
          <label
            htmlFor="structure-php-content"
            className="text-base font-medium text-n-800 md:text-lg"
          >
            Structure.php Content
          </label>

          <Textarea
            id="structure-php-content"
            value={createProjectFormData["structure-php-content"]}
            className="min-h-[354px] w-full resize-none rounded-xl border-[1.5px] border-green-300 bg-green-50 px-[25px] py-[17px] font-mono text-sm leading-7 text-[#1e293b] outline-none placeholder:text-[#1e293b]/60 focus-visible:border-green-300 focus-visible:ring-0 focus-visible:ring-offset-0 md:min-h-[180px] md:px-[25px] md:py-[21px]"
            onChange={(event) =>
              handleCreateProjectFieldValueChange(
                "structure-php-content",
                event.target.value,
              )
            }
          />
        </div>

        {/* Step Three Actions */}
        <CreateProjectActions
          nextLabel="Complete Project"
          onBackAction={handleBackAction}
          onNextAction={handleNextAction}
        />
      </div>
    );
  };

  // Use Effects
  useEffect(() => {
    registerBackAction(handleBackAction);

    return () => {
      registerBackAction(null);
    };
  }, [handleBackAction, registerBackAction]);

  return (
    <section className="flex min-h-full flex-col bg-n-100">
      {/* Page Content */}
      <div className="px-6 py-8 md:px-16 md:py-10 xl:px-24 2xl:px-64">
        <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-10 md:gap-12">
          {/* Progress Section */}
          <CreateProjectProgress
            activeStep={activeStep}
            stepData={getCurrentCreateProjectStep()}
          />

          {/* Step Content */}
          {renderCreateProjectStepContent()}
        </div>
      </div>
    </section>
  );
}
