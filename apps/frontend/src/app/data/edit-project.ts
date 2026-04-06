// TYPES //
import type { CreateProjectFieldOptionData } from "@/types/create-project";

/**
 * Provides the available project categories for the edit-project select field
 */
export const editProjectCategoryOptionItems: CreateProjectFieldOptionData[] = [
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
  "client-email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client-id": "redacted-client-id.apps.googleusercontent.com",
  "client-x509-cert-url": "https://example.com/redacted-client-cert-url",
  "google-sheet-id": "redacted-google-sheet-id",
  "private-key": `-----BEGIN PRIVATE KEY-----
[REDACTED_PRIVATE_KEY_CONTENT]
-----END PRIVATE KEY-----`,
  "private-key-id": "redacted-private-key-id",
  "project-category": "internal-tool",
  "project-id": "your-project-id",
  "project-name": "Internal Analytics Tool",
  slug: "pixolo.io/project-slug",
  "website-url": "pixolo.io/your-website",
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
