"use client";

// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import { AppHeader } from "@/components/layouts/headers/AppHeader";
import { FlowHeader } from "@/components/layouts/headers/FlowHeader";
import { ProjectHeader } from "@/components/layouts/headers/ProjectHeader";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// NAVIGATION //
import { usePathname } from "next/navigation";

// NEXT //

type HeaderPropsData = {
  onToggleMobileMenu: () => void;
};

/**
 * Renders the shared application header and dispatches to the correct header variant
 */
export function Header({ onToggleMobileMenu }: HeaderPropsData): ReactElement {
  // Define Navigation
  const pathname = usePathname();

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Checks whether the current route should use the flow header
   */
  const checkIsFlowHeaderRoute = (): boolean => {
    return pathname === ROUTES.APP.PROJECTS.CREATE;
  };

  /**
   * Checks whether the current route should use the project header
   */
  const checkIsProjectHeaderRoute = (): boolean => {
    if (pathname === ROUTES.APP.PROJECTS.CREATE) {
      return false;
    }

    return pathname.startsWith("/projects/");
  };

  /**
   * Gets the current project name from the pathname
   */
  const getCurrentProjectName = (): string => {
    const pathnameSegmentItems = pathname.split("/").filter(Boolean);
    const projectId = pathnameSegmentItems[1];

    if (!projectId) {
      return "Project";
    }

    return projectId
      .split("-")
      .map((projectNameItem) => {
        return (
          projectNameItem.charAt(0).toUpperCase() + projectNameItem.slice(1)
        );
      })
      .join(" ");
  };

  // Use Effects

  if (checkIsFlowHeaderRoute()) {
    return <FlowHeader onToggleMobileMenu={onToggleMobileMenu} />;
  }

  if (checkIsProjectHeaderRoute()) {
    return (
      <ProjectHeader
        onToggleMobileMenu={onToggleMobileMenu}
        projectName={getCurrentProjectName()}
      />
    );
  }

  return <AppHeader onToggleMobileMenu={onToggleMobileMenu} />;
}
