"use client";

// REACT //
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

// TYPES //
import type {
  GetProjectByIdResponseData,
  ProjectListItemData,
} from "@/types/projects";

// SERVICES //
import {
  getAllProjectsRequest,
  getProjectByIdRequest,
} from "@/services/api/projects.api";

type ProjectDetailsContextData = {
  currentProjectRole: ProjectListItemData["role"] | null;
  projectDetails: GetProjectByIdResponseData | null;
  projectDetailsErrorMessage: string;
  isProjectDetailsLoading: boolean;
  refreshProjectDetailsService: () => Promise<void>;
};

type ProjectDetailsProviderPropsData = {
  children: ReactNode;
  projectId: string;
};

const ProjectDetailsContext = createContext<ProjectDetailsContextData | null>(
  null,
);

/**
 * Provides project details state for all project sub-routes.
 */
export function ProjectDetailsProvider({
  children,
  projectId,
}: ProjectDetailsProviderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [currentProjectRole, setCurrentProjectRole] = useState<
    ProjectListItemData["role"] | null
  >(null);
  const [projectDetails, setProjectDetails] =
    useState<GetProjectByIdResponseData | null>(null);
  const [projectDetailsErrorMessage, setProjectDetailsErrorMessage] =
    useState<string>("");
  const [isProjectDetailsLoading, setIsProjectDetailsLoading] =
    useState<boolean>(true);

  // Helper Functions
  /**
   * Fetches current project details by ID.
   */
  const refreshProjectDetailsService = useCallback(async (): Promise<void> => {
    setIsProjectDetailsLoading(true);
    setProjectDetailsErrorMessage("");
    setCurrentProjectRole(null);

    try {
      const response = await getProjectByIdRequest(projectId);

      if (!response.status || response.status_code !== 200) {
        setProjectDetails(null);
        setProjectDetailsErrorMessage(
          response.message || "Failed to fetch project.",
        );
        return;
      }

      setProjectDetails(response.data);
      setProjectDetailsErrorMessage("");

      try {
        const projectListResponseData = await getAllProjectsRequest();
        const currentProjectIdData = response.data.project.id;
        const currentProjectSlugData = response.data.project.slug;

        if (projectListResponseData.status && projectListResponseData.data) {
          const currentProjectMembershipData =
            projectListResponseData.data.find(
              (projectItemData) =>
                projectItemData.id === currentProjectIdData ||
                projectItemData.slug === currentProjectSlugData,
            );
          setCurrentProjectRole(currentProjectMembershipData?.role ?? null);
        }
      } catch {
        setCurrentProjectRole(null);
      }
    } catch {
      setCurrentProjectRole(null);
      setProjectDetails(null);
      setProjectDetailsErrorMessage("Failed to fetch project.");
    } finally {
      setIsProjectDetailsLoading(false);
    }
  }, [projectId]);

  const projectDetailsContextValue = useMemo(() => {
    return {
      currentProjectRole,
      projectDetails,
      projectDetailsErrorMessage,
      isProjectDetailsLoading,
      refreshProjectDetailsService,
    };
  }, [
    currentProjectRole,
    projectDetails,
    projectDetailsErrorMessage,
    isProjectDetailsLoading,
    refreshProjectDetailsService,
  ]);

  // Use Effects
  useEffect(() => {
    if (!projectId) {
      setProjectDetails(null);
      setProjectDetailsErrorMessage("Invalid project.");
      setIsProjectDetailsLoading(false);
      return;
    }

    refreshProjectDetailsService();
  }, [projectId, refreshProjectDetailsService]);

  return (
    <ProjectDetailsContext.Provider value={projectDetailsContextValue}>
      {children}
    </ProjectDetailsContext.Provider>
  );
}

/**
 * Returns project details context safely.
 */
export function useProjectDetailsContext(): ProjectDetailsContextData {
  const projectDetailsContext = useContext(ProjectDetailsContext);

  if (!projectDetailsContext) {
    throw new Error(
      "useProjectDetailsContext must be used within ProjectDetailsProvider.",
    );
  }

  return projectDetailsContext;
}

/**
 * Returns project details context when available, otherwise null.
 */
export function useOptionalProjectDetailsContext(): ProjectDetailsContextData | null {
  return useContext(ProjectDetailsContext);
}
