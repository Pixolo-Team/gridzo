"use client";

// REACT //
import type { ReactElement } from "react";
import { useState } from "react";

// COMPONENTS //
import ChevronArrowDown from "@/components/icons/neevo-icons/ChevronArrowDown";
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import LineArrowLeft1 from "@/components/icons/neevo-icons/LineArrowLeft1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// UTILS //
import { cn } from "@/lib/utils";

// NAVIGATION //
import { useRouter } from "next/navigation";

type CreateProjectFieldData = {
  helperText?: string;
  label: string;
  placeholder: string;
};

type CreateProjectStepData = {
  description: string;
  percentageLabel: string;
  stepLabel: string;
  title: string;
};

const createProjectStepItems: CreateProjectStepData[] = [
  {
    description:
      "Let's start by setting up the basic details for your new project.",
    percentageLabel: "33%",
    stepLabel: "Step 1 of 3",
    title: "Project Information",
  },
  {
    description:
      "Please provide your Google Cloud service account details. These can be found in your downloaded JSON credentials file.",
    percentageLabel: "66%",
    stepLabel: "Step 2 of 3",
    title: "Google API Credentials",
  },
  {
    description:
      "Paste the content of your structure.php file here to define how the sheet data is mapped",
    percentageLabel: "100%",
    stepLabel: "Step 3 of 3",
    title: "Define Project Structure",
  },
];

const createProjectStepOneFieldItems: CreateProjectFieldData[] = [
  {
    label: "Project Name",
    placeholder: "My Website",
  },
  {
    helperText:
      "This category will determine the icon displayed on the project card.",
    label: "Project Category",
    placeholder: "Select a category",
  },
  {
    label: "Website URL",
    placeholder: "pixolo.io/your-website",
  },
  {
    label: "Slug",
    placeholder: "pixolo.io/project-slug",
  },
  {
    helperText: "The alphanumeric ID from your Google Sheet URL.",
    label: "Google Sheet ID",
    placeholder: "1aB2c3D4e5F6g7H8i9J0kLmNoPqRsTuVwXyZ",
  },
];

const createProjectStepTwoPrimaryFieldItems: CreateProjectFieldData[] = [
  {
    label: "Project ID",
    placeholder: "e.g. pixolo-prod-123456",
  },
  {
    label: "Private Key ID",
    placeholder: "Enter private key ID",
  },
  {
    label: "Client Email",
    placeholder: "service-account@project.iam.gserviceaccount.com",
  },
  {
    label: "Client ID",
    placeholder: "Enter client ID",
  },
];

const createProjectStructurePhpContent = `<?php

// Define your mappings here...
// This allows you to connect spreadsheet columns to database fields.

return [
    'sheet_name' => 'Inventory_Q1',
    'mapping' => [
        'SKU' => 'product_id',
        'Quantity' => 'stock_level',
        'Price' => 'unit_price',
    ]
];`;

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
  const renderCreateProjectInputField = ({
    helperText,
    label,
    placeholder,
  }: CreateProjectFieldData): ReactElement => {
    const checkIsSelectField = label === "Project Category";

    return (
      <div className="flex w-full flex-col gap-2.5 md:gap-3">
        {/* Field Label */}
        <label className="text-base font-medium text-n-800 md:text-lg">
          {label}
        </label>

        {/* Field Input */}
        <div className="relative">
          <Input
            placeholder={placeholder}
            readOnly={checkIsSelectField}
            className={cn(
              "h-[53px] border-[1.5px] border-n-100 bg-n-50 px-[25px] text-base text-n-700 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-[62px] md:text-lg",
              checkIsSelectField ? "cursor-pointer pr-14" : "",
            )}
          />

          {checkIsSelectField ? (
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <ChevronArrowDown
                primaryColor="var(--color-n-400)"
                className="size-5"
              />
            </span>
          ) : null}
        </div>

        {/* Field Helper Text */}
        {helperText ? (
          <p className="text-xs leading-[1.35] text-n-500 md:text-sm">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  };

  /**
   * Renders the desktop and mobile step title block with progress
   */
  const renderCreateProjectProgressSection = (): ReactElement => {
    const currentCreateProjectStep = getCurrentCreateProjectStep();

    return (
      <div className="flex w-full flex-col gap-5">
        {/* Step Heading */}
        <div className="flex flex-col gap-4 md:gap-0">
          <div className="flex items-end justify-between gap-4">
            <div className="text-n-800">
              <p className="text-[20px] leading-7 md:hidden">
                {currentCreateProjectStep.stepLabel}:
              </p>
              <p className="text-[20px] leading-7 font-bold md:hidden">
                {currentCreateProjectStep.title}
              </p>

              <p className="hidden text-3xl md:block">
                <span className="font-normal">
                  {currentCreateProjectStep.stepLabel}:
                </span>{" "}
                <span className="font-bold">
                  {currentCreateProjectStep.title}
                </span>
              </p>
            </div>

            <p className="shrink-0 text-sm font-medium text-n-500 md:text-base">
              {currentCreateProjectStep.percentageLabel}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-n-200 md:mt-3">
            <div
              className={cn(
                "h-full rounded-full bg-n-800",
                getProgressWidthClassName(),
              )}
            />
          </div>
        </div>

        {/* Step Description */}
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
            {currentCreateProjectStep.description}
          </p>
        )}
      </div>
    );
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
        <div className="flex w-full justify-end gap-3 md:gap-5">
          <Button
            type="button"
            size="small"
            variant="secondary"
            className="px-8 text-base md:text-lg"
            onClick={handleBackAction}
          >
            Back
          </Button>

          <Button
            type="button"
            size="small"
            variant="primary"
            className="px-8 text-base md:text-lg"
            onClick={handleNextAction}
          >
            Next Step
          </Button>
        </div>
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

          <textarea
            defaultValue={createProjectStructurePhpContent}
            className="min-h-[354px] w-full resize-none rounded-xl border-[1.5px] border-green-300 bg-green-50 px-[25px] py-[17px] font-mono text-sm leading-7 text-[#1e293b] outline-none md:min-h-[180px] md:px-[25px] md:py-[21px]"
          />
        </div>

        {/* Step Three Actions */}
        <div className="flex w-full justify-end gap-3 md:gap-5">
          <Button
            type="button"
            size="small"
            variant="secondary"
            className="px-8 text-base md:text-lg"
            onClick={handleBackAction}
          >
            Back
          </Button>

          <Button
            type="button"
            size="small"
            variant="primary"
            className="px-8 text-base md:text-lg"
            onClick={handleNextAction}
          >
            Complete Project
          </Button>
        </div>
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
      {/* Mobile Header */}
      <div className="flex items-center justify-between rounded-b-xl bg-n-50 px-7 py-4 md:hidden">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-n-100"
          onClick={handleBackAction}
        >
          <LineArrowLeft1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>

        <h1 className="text-base font-semibold text-n-800">
          Create New Project
        </h1>

        <button
          type="button"
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-n-100"
        >
          <HamburgerMenu1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden border-b border-n-300 bg-n-50 px-7 py-5 md:block">
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-12 items-center justify-center rounded-lg bg-n-100 transition-colors hover:bg-n-200"
            onClick={handleBackAction}
          >
            <LineArrowLeft1
              primaryColor="var(--color-n-500)"
              className="size-6"
            />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[-0.5px] text-n-800">
              Create New Project
            </h1>
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500">
              In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-6 py-8 md:px-16 md:py-10 xl:px-32 2xl:px-64">
        <div className="ml-auto flex w-full max-w-[1024px] flex-col gap-10 md:gap-12">
          {/* Progress Section */}
          {renderCreateProjectProgressSection()}

          {/* Step Content */}
          {renderCreateProjectStepContent()}
        </div>
      </div>
    </section>
  );
}
