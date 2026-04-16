// TYPES //
import type { CreateProjectFieldOptionData } from "@/types/create-project";

/**
 * Provides the available project categories for the edit-project select field
 */
export const editProjectCategoryOptionItems: CreateProjectFieldOptionData[] = [
  {
    label: "Web App",
    value: "web-app",
  },
  {
    label: "Real Estate",
    value: "real-estate",
  },
  {
    label: "E-commerce",
    value: "e-commerce",
  },
  {
    label: "Marketing Site",
    value: "marketing-site",
  },
  {
    label: "Internal Tool",
    value: "internal-tool",
  },
];

/**
 * Provides the dummy project settings metadata used by the edit-project page
 */
export const editProjectDetails = {
  description: "Edit project details and API credentials.",
  discardChangesLabel: "Discard Changes",
  saveChangesLabel: "Save Changes",
  supportCtaLabel: "Contact Support",
  supportLabel: "Need help?",
  title: "Project Settings",
} as const;

/**
 * Provides the dummy edit-project form values keyed by field id
 */
export const editProjectFormValues = {
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
  "website-url": "",
} as const;

/**
 * Provides the dummy edit-project field values that will later come from the API
 */
export const editProjectSectionDetails = {
  basicInfoTitle: "Basic Info",
  categoryHelperText:
    "This category will determine the icon displayed on the project card.",
  googleApiCredentialsTitle: "Google API Credentials",
  googleSheetHelperText: "The alphanumeric ID from your Google Sheet URL.",
} as const;
