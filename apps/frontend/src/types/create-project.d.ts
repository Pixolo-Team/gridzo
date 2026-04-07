export type CreateProjectFieldOptionData = {
  label: string;
  value: string;
};

export type CreateProjectFieldData = {
  controlClassName?: string;
  fieldType?: "input" | "select" | "textarea";
  helperText?: string;
  id: string;
  label: string;
  optionItems?: CreateProjectFieldOptionData[];
  placeholder: string;
  required?: boolean;
  type?: "email" | "text" | "url";
  validationType?: "php";
};

export type CreateProjectFieldGroupData = {
  fieldItems: CreateProjectFieldData[];
  layout: "single-column" | "two-column";
};

export type CreateProjectStepData = {
  description: string;
  fieldGroupItems: CreateProjectFieldGroupData[];
  nextLabel: string;
  percentageLabel: string;
  showBackAction?: boolean;
  stepLabel: string;
  title: string;
};
