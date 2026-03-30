"use client";

// REACT //
import type { ReactElement } from "react";
import { useState } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateProjectActions } from "@/components/projects/create-project/CreateProjectActions";
import { CreateProjectField } from "@/components/projects/create-project/CreateProjectField";
import { CreateProjectHeader } from "@/components/projects/create-project/CreateProjectHeader";
import { CreateProjectProgress } from "@/components/projects/create-project/CreateProjectProgress";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";
import {
  createProjectStepItems,
  createProjectStepOneFieldItems,
  createProjectStepTwoPrimaryFieldItems,
  createProjectStructurePhpContent,
  type CreateProjectFieldData,
  type CreateProjectStepData,
} from "@/components/projects/create-project/create-project.data";

// NAVIGATION //
import { useRouter } from "next/navigation";

/**
 * Renders the create project page flow with three UI-only setup steps
 */
export default function CreateProjectPage(): ReactElement {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs

  // Define States
  const [activeStep, setActiveStep] = useState<number>(1);

  // Helper Functions
  /**
   * Gets the current step content metadata
   */
  const getCurrentCreateProjectStep = (): CreateProjectStepData => {
    return createProjectStepItems[activeStep - 1];
  };

  /**
   * Gets the progress width class for the active step
   */
  const getProgressWidthClassName = (): string => {
    if (activeStep === 1) {
      return "w-1/3";
    }

    if (activeStep === 2) {
      return "w-2/3";
    }

    return "w-full";
  };

  /**
   * Navigates to the previous step or back to the dashboard from the first step
   */
  const handleBackAction = (): void => {
    if (activeStep === 1) {
      router.push(ROUTES.APP.DASHBOARD);
      return;
    }

    setActiveStep((previousActiveStep) => previousActiveStep - 1);
  };

  /**
   * Navigates to the next step or completes the UI flow on the final step
   */
  const handleNextAction = (): void => {
    if (activeStep === 3) {
      router.push(ROUTES.APP.DASHBOARD);
      return;
    }

    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  };

  /**
   * Renders a shared text field for the create project flow
   */
  const renderCreateProjectInputField = (
    createProjectFieldData: CreateProjectFieldData,
  ): ReactElement => {
    return <CreateProjectField {...createProjectFieldData} />;
  };

  /**
   * Renders the first step fields
   */
  const renderCreateProjectStepOneContent = (): ReactElement => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step One Fields */}
        <div className="flex w-full flex-col gap-7 md:gap-8">
          {createProjectStepOneFieldItems.map((createProjectFieldItem) => (
            <div key={createProjectFieldItem.label}>
              {renderCreateProjectInputField(createProjectFieldItem)}
            </div>
          ))}
        </div>

        {/* Step One Action */}
        <Button
          type="button"
          size="small"
          variant="primary"
          className="w-[140px] text-base md:w-auto md:px-8 md:text-lg"
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
  const renderCreateProjectStepTwoContent = (): ReactElement => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step Two Grid Fields */}
        <div className="grid w-full gap-7 md:grid-cols-2 md:gap-x-7 md:gap-y-8">
          {createProjectStepTwoPrimaryFieldItems.map((createProjectFieldItem) => (
            <div key={createProjectFieldItem.label}>
              {renderCreateProjectInputField(createProjectFieldItem)}
            </div>
          ))}
        </div>

        {/* Step Two Full Width Fields */}
        <div className="flex w-full flex-col gap-7 md:gap-8">
          {renderCreateProjectInputField({
            label: "Client x509 Cert URL",
            placeholder: "https://www.googleapis.com/robot/v1/metadata/x509/...",
          })}

          {renderCreateProjectInputField({
            label: "Private Key",
            placeholder: "-----BEGIN PRIVATE KEY-----",
          })}
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
  const renderCreateProjectStepThreeContent = (): ReactElement => {
    return (
      <div className="flex w-full flex-col items-end gap-7 md:gap-8">
        {/* Step Three Editor */}
        <div className="flex w-full flex-col gap-2.5 md:gap-3">
          <label className="text-base font-medium text-n-800 md:text-lg">
            Structure.php Content
          </label>

          <Textarea
            defaultValue={createProjectStructurePhpContent}
            className="min-h-[354px] w-full resize-none rounded-xl border-[1.5px] border-green-300 bg-green-50 px-[25px] py-[17px] font-mono text-sm leading-7 text-[#1e293b] outline-none md:min-h-[180px] md:px-[25px] md:py-[21px]"
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

  /**
   * Renders the current step form area
   */
  const renderCreateProjectStepContent = (): ReactElement => {
    if (activeStep === 1) {
      return renderCreateProjectStepOneContent();
    }

    if (activeStep === 2) {
      return renderCreateProjectStepTwoContent();
    }

    return renderCreateProjectStepThreeContent();
  };

  // Use Effects

  return (
    <section className="flex min-h-full flex-col bg-n-100">
      <CreateProjectHeader onBackAction={handleBackAction} />

      {/* Page Content */}
      <div className="px-6 py-8 md:px-16 md:py-10 xl:px-32 2xl:px-64">
        <div className="ml-auto flex w-full max-w-[1024px] flex-col gap-10 md:gap-12">
          {/* Progress Section */}
          <CreateProjectProgress
            activeStep={activeStep}
            progressWidthClassName={getProgressWidthClassName()}
            stepData={getCurrentCreateProjectStep()}
          />

          {/* Step Content */}
          {renderCreateProjectStepContent()}
        </div>
      </div>
    </section>
  );
}
