// TYPES //
import type {
  CreateProjectFieldOptionData,
  CreateProjectStepData,
} from "@/types/create-project";

/**
 * Provides the available project categories for the create-project select field
 */
export const createProjectCategoryOptionItems: CreateProjectFieldOptionData[] =
  [
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

/**
 * Provides the create-project flow configuration for all steps
 */
export const createProjectStepItems: CreateProjectStepData[] = [
  {
    description:
      "Let's start by setting up the basic details for your new project.",
    fieldGroupItems: [
      {
        layout: "single-column",
        fieldItems: [
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
        ],
      },
    ],
    nextLabel: "Next Step",
    percentageLabel: "33%",
    stepLabel: "Step 1 of 3",
    title: "Project Information",
  },
  {
    description:
      "Please provide your Google Cloud service account details. These can be found in your downloaded JSON credentials file.",
    fieldGroupItems: [
      {
        layout: "two-column",
        fieldItems: [
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
        ],
      },
      {
        layout: "single-column",
        fieldItems: [
          {
            id: "client-x509-cert-url",
            label: "Client x509 Cert URL",
            placeholder:
              "https://www.googleapis.com/robot/v1/metadata/x509/...",
            required: true,
            type: "url",
          },
          {
            id: "private-key",
            label: "Private Key",
            placeholder: "-----BEGIN PRIVATE KEY-----",
            required: true,
          },
        ],
      },
    ],
    nextLabel: "Next Step",
    percentageLabel: "66%",
    showBackAction: true,
    stepLabel: "Step 2 of 3",
    title: "Google API Credentials",
  },
  {
    description:
      "Paste the content of your structure.php file here to define how the sheet data is mapped",
    fieldGroupItems: [
      {
        layout: "single-column",
        fieldItems: [
          {
            controlClassName:
              "min-h-[354px] w-full resize-none rounded-xl border-[1.5px] border-green-300 bg-green-50 px-[25px] py-[17px] font-mono text-sm leading-7 text-[#1e293b] outline-none placeholder:text-[#1e293b]/60 focus-visible:border-green-300 focus-visible:ring-0 focus-visible:ring-offset-0 md:min-h-[180px] md:px-[25px] md:py-[21px]",
            fieldType: "textarea",
            id: "structure-php-content",
            label: "Structure.php Content",
            placeholder: "Paste the contents of your structure.php file",
            required: true,
          },
        ],
      },
    ],
    nextLabel: "Complete Project",
    percentageLabel: "100%",
    showBackAction: true,
    stepLabel: "Step 3 of 3",
    title: "Define Project Structure",
  },
];
