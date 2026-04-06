"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import Link from "next/link";
import EditProjectSection from "@/components/projects/edit-project/EditProjectSection";
import Dropdown from "@/components/ui/Dropdown";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import InputBox from "@/components/ui/InputBox";
import MobileBottomActions from "@/components/layouts/MobileBottomActions";
import PageIntro from "@/components/ui/PageIntro";
import TextareaBox from "@/components/ui/TextareaBox";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// DATA //
import {
  editProjectDetails,
  editProjectFormValues,
  editProjectCategoryOptionItems,
  editProjectSectionDetails,
} from "@/app/data/edit-project";

type EditProjectFormValueData = Record<string, string>;

/**
 * Renders the edit project page
 */
export default function EditProjectPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [formInputField, setFormInputField] =
    useState<EditProjectFormValueData>(() => ({ ...editProjectFormValues }));

  // Helper Functions
  /**
   * Updates the local edit-project field value
   */
  const handleFieldValueChange = (fieldId: string, value: string): void => {
    setFormInputField((previousFormInputField) => {
      return {
        ...previousFormInputField,
        [fieldId]: value,
      };
    });
  };

  /**
   * Gets the current value for the provided edit-project field
   */
  const getFieldValue = (fieldId: string): string => {
    return formInputField[fieldId] ?? "";
  };

  /**
   * Renders the shared footer support copy
   */
  const renderFooterSupportText = (className: string) => {
    return (
      <p className={className}>
        {editProjectDetails.supportLabel}{" "}
        <Link
          href={ROUTES.LEGAL.SUPPORT}
          className="font-medium text-n-700 underline underline-offset-2 transition-colors hover:text-n-950"
        >
          {editProjectDetails.supportCtaLabel}
        </Link>
      </p>
    );
  };

  /**
   * Renders the shared footer action buttons
   */
  const renderFooterActionButtons = (buttonClassName?: string) => {
    return (
      <>
        <Button
          type="button"
          size="small"
          variant="secondary"
          className={buttonClassName}
        >
          {editProjectDetails.discardChangesLabel}
        </Button>

        <Button
          type="button"
          size="small"
          variant="primary"
          className={buttonClassName}
        >
          {editProjectDetails.saveChangesLabel}
        </Button>
      </>
    );
  };

  /**
   * Renders the responsive footer action row
   */
  const renderFooterActionRow = () => {
    return (
      <>
        <div className="hidden items-end justify-between gap-5 border-t border-n-300 pt-10 md:flex">
          {renderFooterSupportText("text-sm text-n-500")}

          <div className="flex items-center gap-5">
            {renderFooterActionButtons()}
          </div>
        </div>

        <MobileBottomActions>
          <div className="flex w-full flex-col gap-5">
            <div className="flex items-center gap-2">
              {renderFooterActionButtons("h-12 flex-1 px-4 text-sm")}
            </div>

            {renderFooterSupportText("text-center text-xs text-n-500")}
          </div>
        </MobileBottomActions>
      </>
    );
  };

  // Use Effects

  return (
    <>
      <section className="flex min-h-full flex-col gap-11 px-6 py-8 pb-44 md:px-9 md:py-10 md:pb-10 xl:gap-10 xl:px-9 xl:py-10 xl:pb-10">
        <PageIntro
          description={editProjectDetails.description}
          title={editProjectDetails.title}
        />

        <div className="flex flex-col gap-8 xl:gap-10">
          {/* Basic Info Section */}
          <EditProjectSection title={editProjectSectionDetails.basicInfoTitle}>
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-8">
              {/* Project Name */}
              <InputBox
                id="project-name"
                label="Project Name"
                placeholder="Project Name"
                value={getFieldValue("project-name")}
                onChange={(nextValue) =>
                  handleFieldValueChange("project-name", nextValue)
                }
              />

              {/* Project Category */}
              <div className="flex w-full flex-col gap-2.5 md:gap-3">
                <FieldLabel
                  htmlFor="project-category"
                  className="text-base leading-normal font-medium text-n-800 md:text-lg"
                >
                  Project Category
                </FieldLabel>
                <Dropdown
                  id="project-category"
                  className="h-12 md:h-14 xl:h-16"
                  options={editProjectCategoryOptionItems}
                  selectedOption={getFieldValue("project-category")}
                  title="Project Category"
                  onChange={(nextValue) =>
                    handleFieldValueChange("project-category", nextValue)
                  }
                />
                <FieldDescription className="text-xs leading-[1.35] text-n-500 md:text-sm">
                  {editProjectSectionDetails.categoryHelperText}
                </FieldDescription>
              </div>

              {/* Website URL */}
              <InputBox
                id="website-url"
                label="Website URL"
                placeholder="Website URL"
                value={getFieldValue("website-url")}
                onChange={(nextValue) =>
                  handleFieldValueChange("website-url", nextValue)
                }
              />

              {/* Slug */}
              <InputBox
                id="slug"
                label="Slug"
                placeholder="Slug"
                value={getFieldValue("slug")}
                onChange={(nextValue) =>
                  handleFieldValueChange("slug", nextValue)
                }
              />
            </div>

            {/* Google Sheet ID */}
            <div className="flex flex-col gap-7">
              <InputBox
                id="google-sheet-id"
                label="Google Sheet ID"
                placeholder="Google Sheet ID"
                value={getFieldValue("google-sheet-id")}
                caption={editProjectSectionDetails.googleSheetHelperText}
                onChange={(nextValue) =>
                  handleFieldValueChange("google-sheet-id", nextValue)
                }
              />
            </div>
          </EditProjectSection>

          <div className="border-t border-n-300" />

          {/* Google Credentials */}
          <EditProjectSection
            title={editProjectSectionDetails.googleApiCredentialsTitle}
          >
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-8">
              {/* Project ID */}
              <InputBox
                id="project-id"
                label="Project ID"
                placeholder="Project ID"
                value={getFieldValue("project-id")}
                onChange={(nextValue) =>
                  handleFieldValueChange("project-id", nextValue)
                }
              />

              {/* Private Key ID */}
              <InputBox
                id="private-key-id"
                label="Private Key ID"
                placeholder="Private Key ID"
                value={getFieldValue("private-key-id")}
                onChange={(nextValue) =>
                  handleFieldValueChange("private-key-id", nextValue)
                }
              />

              {/* Client Email */}
              <InputBox
                id="client-email"
                label="Client Email"
                placeholder="Client Email"
                value={getFieldValue("client-email")}
                onChange={(nextValue) =>
                  handleFieldValueChange("client-email", nextValue)
                }
              />

              {/* Client ID */}
              <InputBox
                id="client-id"
                label="Client ID"
                placeholder="Client ID"
                value={getFieldValue("client-id")}
                onChange={(nextValue) =>
                  handleFieldValueChange("client-id", nextValue)
                }
              />
            </div>

            <div className="flex flex-col gap-7 xl:gap-8">
              {/* Client x509 Cert URL */}
              <InputBox
                id="client-x509-cert-url"
                label="Client x509 Cert URL"
                placeholder="Client x509 Cert URL"
                value={getFieldValue("client-x509-cert-url")}
                onChange={(nextValue) =>
                  handleFieldValueChange("client-x509-cert-url", nextValue)
                }
              />

              {/* Private Key */}
              <TextareaBox
                id="private-key"
                label="Private Key"
                placeholder="Private Key"
                value={getFieldValue("private-key")}
                onChange={(nextValue) =>
                  handleFieldValueChange("private-key", nextValue)
                }
              />
            </div>
          </EditProjectSection>
        </div>

        {renderFooterActionRow()}
      </section>
    </>
  );
}
