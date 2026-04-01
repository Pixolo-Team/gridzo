// COMPONENTS //
import type { InputActionCardData } from "@/components/ui/InputActionCard";
import type { StatCardData } from "@/components/ui/StatCard";

// CONSTANTS //
import type { projectOverviewStatIconMap } from "@/app/constants/project-overview-stat-icons";
import { CONSTANTS } from "@/constants/constants";

/**
 * Provides the Project overview statistic card data
 */
export const projectOverviewStatItems = [
  {
    id: "total-pages",
    iconName: "TextFile",
    title: "Total Pages",
    value: "23",
    accentLabel: "+2 this week",
    accentToneClassName: "text-success-500",
    iconBackgroundClassName: "bg-blue-50",
    iconColorClassName: "text-blue-500",
  },
  {
    id: "last-deployment",
    iconName: "TimeLapse",
    title: "Last Deployment",
    value: "2h ago",
    accentLabel: "Auto-deployment on",
    accentToneClassName: "text-n-400",
    iconBackgroundClassName: "bg-purple-50",
    iconColorClassName: "text-purple-500",
  },
  {
    id: "active-templates",
    iconName: "TemplateThemeDesignLayout",
    title: "Active Templates",
    value: "2",
    accentLabel: "System optimized",
    accentToneClassName: "text-orange-500",
    iconBackgroundClassName: "bg-orange-50",
    iconColorClassName: "text-orange-500",
  },
] satisfies ProjectOverviewStatData[];

export type ProjectOverviewStatData = StatCardData & {
  iconName: keyof typeof projectOverviewStatIconMap;
};

/**
 * Builds the project overview API card content for the current project
 */
export function getProjectOverviewInputActionCard(
  projectId: string,
): InputActionCardData {
  return {
    title: "Project API Endpoint",
    description:
      "This API endpoint provides access to your project's structured data for integrations and external applications.",
    value: `${CONSTANTS.API_URL}/v1/projects/${projectId}/data`,
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
