// TYPES //
import { DashboardProjectVisualData } from "@/types/projects";

export const dashboardProjectVisualItemsData: DashboardProjectVisualData[] = [
  {
    backgroundClassName: "bg-blue-100",
    iconColorClassName: "text-blue-500",
    iconName: "GraphicTemplateWebsiteUi",
  },
  {
    backgroundClassName: "bg-green-100",
    iconColorClassName: "text-green-500",
    iconName: "WebApplicationLearning",
  },
  {
    backgroundClassName: "bg-orange-100",
    iconColorClassName: "text-orange-500",
    iconName: "ShoppingCart2",
  },
  {
    backgroundClassName: "bg-purple-100",
    iconColorClassName: "text-purple-500",
    iconName: "DocumentationNewsletter",
  },
];

export const dashboardProjectCategoryVisualMapData: Partial<
  Record<string, DashboardProjectVisualData>
> = {
  "marketing-site": dashboardProjectVisualItemsData[0],
  "web-app": dashboardProjectVisualItemsData[1],
  "e-commerce": dashboardProjectVisualItemsData[2],
  documentation: dashboardProjectVisualItemsData[3],
};
