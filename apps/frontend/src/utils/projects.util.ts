// TYPES //
import { DashboardProjectVisualData } from "@/types/projects";

// DATA //
import {
  dashboardProjectCategoryVisualMapData,
  dashboardProjectVisualItemsData,
} from "@/app/data/dashboard-projects.data";

/**
 * Resolves visual style for a project card using category first, then index fallback.
 */
export const getDashboardProjectVisuals = (
  projectCategoryData: string | null | undefined,
  projectIndexData: number,
): DashboardProjectVisualData => {
  const normalizedProjectCategoryData = projectCategoryData?.toLowerCase();

  if (
    normalizedProjectCategoryData &&
    dashboardProjectCategoryVisualMapData[normalizedProjectCategoryData]
  ) {
    return dashboardProjectCategoryVisualMapData[normalizedProjectCategoryData];
  }

  return (
    dashboardProjectVisualItemsData[
      projectIndexData % dashboardProjectVisualItemsData.length
    ] ?? dashboardProjectVisualItemsData[0]
  );
};
