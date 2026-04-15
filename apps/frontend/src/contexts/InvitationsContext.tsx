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
import type { MyProjectInvitationData } from "@/types/projects";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";

// API SERVICES //
import { getMyProjectInvitationsRequest } from "@/services/api/projects.api";

type ProjectInvitationsContextData = {
  invitationItems: MyProjectInvitationData[];
  isInvitationItemsLoading: boolean;
  refreshInvitationItemsService: () => void;
  removeInvitationItemService: (invitationIdData: string) => void;
};

const ProjectInvitationsContext =
  createContext<ProjectInvitationsContextData | null>(null);

type ProjectInvitationsProviderPropsData = {
  children: ReactNode;
};

/**
 * Provides shared invitation state and mount-time invitation fetching for the app shell.
 */
export function ProjectInvitationsProvider({
  children,
}: ProjectInvitationsProviderPropsData) {
  // Define Navigation

  // Define Context
  const { isLoading, session } = useAuthContext();

  // Define Refs

  // Define States
  const [invitationItems, setInvitationItems] = useState<
    MyProjectInvitationData[]
  >([]);
  const [isInvitationItemsLoading, setIsInvitationItemsLoading] =
    useState<boolean>(false);

  // Helper Functions
  /**
   * Fetches pending invitations for the authenticated user.
   */
  const refreshInvitationItemsService = useCallback((): void => {
    setIsInvitationItemsLoading(true);

    getMyProjectInvitationsRequest()
      .then((response) => {
        if (response.status_code === 200 && response.data) {
          setInvitationItems(response.data.invitations);
          return;
        }

        setInvitationItems([]);
      })
      .catch(() => {
        setInvitationItems([]);
      })
      .finally(() => {
        setIsInvitationItemsLoading(false);
      });
  }, []);

  /**
   * Removes an invitation from shared state by id after user action.
   */
  const removeInvitationItemService = useCallback(
    (invitationIdData: string): void => {
      setInvitationItems((previousInvitationItemsData) => {
        return previousInvitationItemsData.filter((invitationItemData) => {
          return invitationItemData.id !== invitationIdData;
        });
      });
    },
    [],
  );

  const projectInvitationsContextValue = useMemo(() => {
    return {
      invitationItems,
      isInvitationItemsLoading,
      refreshInvitationItemsService,
      removeInvitationItemService,
    };
  }, [
    invitationItems,
    isInvitationItemsLoading,
    refreshInvitationItemsService,
    removeInvitationItemService,
  ]);

  // Use Effects
  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    // Fetch once when app auth state is ready, so notification popovers read shared data.
    refreshInvitationItemsService();
  }, [isLoading, session, refreshInvitationItemsService]);

  return (
    <ProjectInvitationsContext.Provider value={projectInvitationsContextValue}>
      {children}
    </ProjectInvitationsContext.Provider>
  );
}

/**
 * Returns the shared invitations context safely.
 */
export function useProjectInvitationsContext(): ProjectInvitationsContextData {
  const projectInvitationsContext = useContext(ProjectInvitationsContext);

  if (!projectInvitationsContext) {
    throw new Error(
      "useProjectInvitationsContext must be used within ProjectInvitationsProvider.",
    );
  }

  return projectInvitationsContext;
}
