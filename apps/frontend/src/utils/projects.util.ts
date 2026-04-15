// TYPES //
import type { DashboardProjectVisualData } from "@/types/projects";
import type {
  ProjectPendingInvitationData,
  ProjectUserData,
} from "@/types/projects";
import type { UserData } from "@/types/user";

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

/**
 * Maps project role values to user table role labels.
 */
export const getUserRoleLabelService = (
  roleData: ProjectUserData["role"] | ProjectPendingInvitationData["role"],
): UserData["role"] => {
  if (roleData === "owner") {
    return "Owner";
  }

  if (roleData === "admin" || roleData === "editor") {
    return "Manager";
  }

  return "Member";
};
