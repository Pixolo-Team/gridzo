"use client";

// REACT //
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// TYPES //
import type { CreateProjectStepData } from "@/types/create-project";
import type { CreateProjectRequestData } from "@/types/projects";

// COMPONENTS //
import { CreateProjectProgress } from "@/components/projects/create-project/CreateProjectProgress";
import CreateProjectStepContent from "@/components/projects/create-project/CreateProjectStepContent";

// CONTEXTS //
import { useCreateProjectFlowContext } from "@/contexts/create-project-flow.context";

// SERVICES //
import { createProjectRequest } from "@/services/api/projects.api";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// DATA //
import { createProjectStepItems } from "@/app/data/create-project";

/**
 * Renders the create project page flow with three setup steps
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
  const [
    createProjectSubmissionErrorMessage,
    setCreateProjectSubmissionErrorMessage,
  ] = useState<string>("");
  const [isSubmittingProject, setIsSubmittingProject] =
    useState<boolean>(false);

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
    if (createProjectSubmissionErrorMessage) {
      setCreateProjectSubmissionErrorMessage("");
    }

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
   * Normalizes URL values by ensuring they include a protocol
   */
  const normalizeUrlService = (urlValue: string): string | undefined => {
    const trimmedUrlValue = urlValue.trim();

    if (!trimmedUrlValue) {
      return undefined;
    }

    if (/^https?:\/\//i.test(trimmedUrlValue)) {
      return trimmedUrlValue;
    }

    return `https://${trimmedUrlValue}`;
  };

  /**
   * Returns the payload used to create a project
   */
  const getCreateProjectPayloadService = (): CreateProjectRequestData => {
    return {
      name: createProjectFormField["project-name"],
      slug: createProjectFormField.slug,
      category: createProjectFormField["project-category"] || undefined,
      website_url: normalizeUrlService(createProjectFormField["website-url"]),
      google_sheet_credentials: {
        google_sheet_id: createProjectFormField["google-sheet-id"],
        google_project_id: createProjectFormField["project-id"] || undefined,
        private_key_id: createProjectFormField["private-key-id"] || undefined,
        client_email: createProjectFormField["client-email"],
        client_id: createProjectFormField["client-id"] || undefined,
        client_x509_cert_url: normalizeUrlService(
          createProjectFormField["client-x509-cert-url"],
        ),
        private_key: createProjectFormField["private-key"],
      },
      structure: {
        php_code: createProjectFormField["structure-php-content"] || undefined,
        json_code: {},
      },
    };
  };

  /**
   * Builds success page params from current form values
   */
  const getCreateProjectSuccessSearchParamsService = (): URLSearchParams => {
    return new URLSearchParams({
      projectName: createProjectFormField["project-name"] ?? "",
      slug: createProjectFormField.slug ?? "",
      websiteUrl: createProjectFormField["website-url"] ?? "",
    });
  };

  /** Function to create a project via API */
  const createProjectService = (): Promise<boolean> => {
    // Set submitting to true
    setIsSubmittingProject(true);

    // Make API call to create project with form values as payload
    return createProjectRequest(getCreateProjectPayloadService())
      .then((response) => {
        // If project creation was successful, return true to proceed to success page
        if (response.status_code === 201 && response.status) {
          return true;
        }

        // Set Create project submission error message to response message
        setCreateProjectSubmissionErrorMessage(
          response.message || "Failed to create project.",
        );
        return false;
      })
      .catch(() => {
        // Set Create project submission error message to response message
        setCreateProjectSubmissionErrorMessage(
          "Failed to create project. Please try again.",
        );
        return false;
      })
      .finally(() => {
        setIsSubmittingProject(false);
      });
  };

  /**
   * Navigates to the next step or creates the project on the final step
   */
  const handleNextAction = async (): Promise<void> => {
    if (checkIsFinalCreateProjectStep()) {
      if (isSubmittingProject) {
        return;
      }

      setCreateProjectSubmissionErrorMessage("");

      const isProjectCreated = await createProjectService();

      if (!isProjectCreated) {
        return;
      }

      const createProjectSuccessSearchParams =
        getCreateProjectSuccessSearchParamsService();

      router.push(
        `${ROUTES.APP.PROJECTS.CREATE_SUCCESS}?${createProjectSuccessSearchParams.toString()}`,
      );
      return;
    }

    setCreateProjectSubmissionErrorMessage("");
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
            isNextActionDisabled={
              isSubmittingProject && checkIsFinalCreateProjectStep()
            }
            stepData={getCurrentCreateProjectStep()}
            onBackAction={handleBackAction}
            onNextAction={handleNextAction}
            onValueChange={handleCreateProjectFieldValueChange}
          />

          {createProjectSubmissionErrorMessage ? (
            <p className="text-sm text-destructive">
              {createProjectSubmissionErrorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
