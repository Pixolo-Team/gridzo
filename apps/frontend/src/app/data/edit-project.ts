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
export const editProjectFormValueData = {
  "client-email": "service-account@project.iam.gserviceaccount.com",
  "client-id": "782349012384-asdfjklasdf8901234.apps.googleusercontent.com",
  "client-x509-cert-url":
    "https://www.googleapis.com/robot/v1/metadata/x509/...",
  "google-sheet-id": "1aB2c3D4e5F6g7H8i9J0kLmNoPqRsTuVwXyZ",
  "private-key": `{
  "type": "service_account",
  "project_id": "api-project-12345",
  "private_key_id": "f1234567890abcdef1234567890abcdef",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpY...\\n-----END PRIVATE KEY-----\\n",
  ...
}`,
  "private-key-id": "••••••••••••••••••••••••••••",
  "project-category": "real-estate",
  "project-id": "pixolo-prod-123456",
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
