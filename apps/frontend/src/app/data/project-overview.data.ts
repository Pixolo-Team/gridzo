// COMPONENTS //
import type { InputActionCardData } from "@/components/ui/InputActionCard";
import type { StatCardData } from "@/components/ui/StatCard";

export const projectOverviewStatItems: StatCardData[] = [
  {
    id: "total-pages",
    title: "Total Pages",
    value: "23",
    accentLabel: "+2 this week",
    accentToneClassName: "text-success-500",
    iconBackgroundClassName: "bg-blue-50",
    iconColorClassName: "text-blue-500",
  },
  {
    id: "last-deployment",
    title: "Last Deployment",
    value: "2h ago",
    accentLabel: "Auto-deployment on",
    accentToneClassName: "text-n-400",
    iconBackgroundClassName: "bg-purple-50",
    iconColorClassName: "text-purple-500",
  },
  {
    id: "active-templates",
    title: "Active Templates",
    value: "2",
    accentLabel: "System optimized",
    accentToneClassName: "text-orange-500",
    iconBackgroundClassName: "bg-orange-50",
    iconColorClassName: "text-orange-500",
  },
];

/**
 * Builds the project overview API card content for the current project
 */
export function getProjectOverviewInputActionCardData(
  projectId: string,
): InputActionCardData {
  return {
    title: "Project API Endpoint",
    description:
      "This API endpoint provides access to your project's structured data for integrations and external applications.",
    value: `https://api.pixolo.com/v1/projects/${projectId}/data`,
    actionItems: [
      {
        id: "api-data",
        label: "API Data",
        variant: "secondary",
        iconToneClassName: "text-n-600",
      },
      {
        id: "api-url",
        label: "API URL",
        variant: "primary",
        iconToneClassName: "text-n-50",
      },
    ],
  };
}
