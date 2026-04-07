"use client";

// REACT //
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// TYPES //
import type { CreateProjectStepData } from "@/types/create-project";

// COMPONENTS //
import { CreateProjectProgress } from "@/components/projects/create-project/CreateProjectProgress";
import CreateProjectStepContent from "@/components/projects/create-project/CreateProjectStepContent";

// CONTEXTS //
import { useCreateProjectFlowContext } from "@/contexts/create-project-flow.context";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// DATA //
import { createProjectStepItems } from "@/app/data/create-project";

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
  const [createProjectFormField, setCreateProjectFormField] = useState<
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
    "structure-php-content": "",
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
    setCreateProjectFormField((previousCreateProjectFormField) => ({
      ...previousCreateProjectFormField,
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
      const createProjectSuccessSearchParams = new URLSearchParams({
        owner: createProjectFormField.owner ?? "",
        projectName: createProjectFormField["project-name"] ?? "",
        slug: createProjectFormField.slug ?? "",
        websiteUrl: createProjectFormField["website-url"] ?? "",
      });

      router.push(
        `${ROUTES.APP.PROJECTS.CREATE_SUCCESS}?${createProjectSuccessSearchParams.toString()}`,
      );
      return;
    }

    setActiveStep((previousActiveStep) => previousActiveStep + 1);
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
      <div className="px-6 py-8 md:px-16 md:py-10 xl:px-24 2xl:px-54">
        {/* Flow Container */}
        <div className="mx-auto flex w-full flex-col gap-10 md:max-w-[88%] md:min-w-0 md:gap-12 lg:max-w-[90%] xl:max-w-[90%] 2xl:max-w-[86%]">
          {/* Progress Section */}
          <CreateProjectProgress
            activeStep={activeStep}
            stepData={getCurrentCreateProjectStep()}
          />

          {/* Step Content */}
          <CreateProjectStepContent
            createProjectFormData={createProjectFormField}
            stepData={getCurrentCreateProjectStep()}
            onBackAction={handleBackAction}
            onNextAction={handleNextAction}
            onValueChange={handleCreateProjectFieldValueChange}
          />
        </div>
      </div>
    </section>
  );
}
