export type CreateProjectFieldOptionData = {
  label: string;
  value: string;
};

export type CreateProjectFieldData = {
  fieldType?: "input" | "select";
  helperText?: string;
  id: string;
  label: string;
  optionItems?: CreateProjectFieldOptionData[];
  placeholder: string;
  required?: boolean;
  type?: "email" | "text" | "url";
};

export type CreateProjectStepData = {
  description: string;
  percentageLabel: string;
  stepLabel: string;
  title: string;
};

/**
 * Provides the create-project step progress content
 */
export const createProjectStepItems: CreateProjectStepData[] = [
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

/**
 * Provides the available project categories for the create-project select field
 */
export const createProjectCategoryOptionItems: CreateProjectFieldOptionData[] = [
  {
    label: "E-commerce",
    value: "e-commerce",
  },
  {
    label: "Marketing Site",
    value: "marketing-site",
  },
  {
    label: "Documentation",
    value: "documentation",
  },
  {
    label: "Web App",
    value: "web-app",
  },
];

/**
 * Provides the first-step fields for the create-project flow
 */
export const createProjectStepOneFieldItems: CreateProjectFieldData[] = [
  {
    id: "project-name",
    label: "Project Name",
    placeholder: "My Website",
    required: true,
  },
  {
    fieldType: "select",
    helperText:
      "This category will determine the icon displayed on the project card.",
    id: "project-category",
    label: "Project Category",
    optionItems: createProjectCategoryOptionItems,
    placeholder: "Select a category",
    required: true,
  },
  {
    id: "website-url",
    label: "Website URL",
    placeholder: "pixolo.io/your-website",
    required: true,
    type: "url",
  },
  {
    id: "slug",
    label: "Slug",
    placeholder: "pixolo.io/project-slug",
    required: true,
  },
  {
    helperText: "The alphanumeric ID from your Google Sheet URL.",
    id: "google-sheet-id",
    label: "Google Sheet ID",
    placeholder: "1aB2c3D4e5F6g7H8i9J0kLmNoPqRsTuVwXyZ",
    required: true,
  },
];

/**
 * Provides the second-step primary fields for the create-project flow
 */
export const createProjectStepTwoPrimaryFieldItems: CreateProjectFieldData[] = [
  {
    id: "project-id",
    label: "Project ID",
    placeholder: "e.g. pixolo-prod-123456",
    required: true,
  },
  {
    id: "private-key-id",
    label: "Private Key ID",
    placeholder: "Enter private key ID",
    required: true,
  },
  {
    id: "client-email",
    label: "Client Email",
    placeholder: "service-account@project.iam.gserviceaccount.com",
    required: true,
    type: "email",
  },
  {
    id: "client-id",
    label: "Client ID",
    placeholder: "Enter client ID",
    required: true,
  },
];

/**
 * Provides the second-step trailing fields for the create-project flow
 */
export const createProjectStepTwoSecondaryFieldItems: CreateProjectFieldData[] = [
  {
    id: "client-x509-cert-url",
    label: "Client x509 Cert URL",
    placeholder: "https://www.googleapis.com/robot/v1/metadata/x509/...",
    required: true,
    type: "url",
  },
  {
    id: "private-key",
    label: "Private Key",
    placeholder: "-----BEGIN PRIVATE KEY-----",
    required: true,
  },
];

/**
 * Provides the starter structure.php content for new projects
 */
export const createProjectStructurePhpContent = `<?php

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
