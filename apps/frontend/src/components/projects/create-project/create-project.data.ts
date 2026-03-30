export type CreateProjectFieldData = {
  helperText?: string;
  label: string;
  placeholder: string;
};

export type CreateProjectStepData = {
  description: string;
  percentageLabel: string;
  stepLabel: string;
  title: string;
};

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

export const createProjectStepOneFieldItems: CreateProjectFieldData[] = [
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

export const createProjectStepTwoPrimaryFieldItems: CreateProjectFieldData[] = [
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
