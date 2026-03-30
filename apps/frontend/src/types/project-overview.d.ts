export type ProjectOverviewStatData = {
  accentLabel?: string;
  accentToneClassName?: string;
  iconBackgroundClassName: string;
  iconColorClassName: string;
  id: string;
  title: string;
  value: string;
};

export type InputActionCardActionData = {
  iconToneClassName?: string;
  id: string;
  label: string;
  variant: "primary" | "secondary";
};

export type ProjectOverviewInputActionCardData = {
  actionItems: InputActionCardActionData[];
  description: string;
  title: string;
  value: string;
};
