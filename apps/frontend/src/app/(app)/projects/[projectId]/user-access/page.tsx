"use client";

// REACT //
import { useEffect, useState } from "react";

// COMPONENTS //
import UsersTable from "@/components/projects/user-access/UsersTable";
import InputActionCard from "@/components/ui/InputActionCard";
import PageIntro from "@/components/ui/PageIntro";

// API SERVICES //
import {
  getAllUsersRequest,
  inviteUserRequest,
} from "@/services/api/projects.api";

// CONTEXTS //
import { useProjectDetailsContext } from "@/contexts/ProjectContext";

// UTILS //
import { getUserRoleLabelService } from "@/utils/projects.util";
import { validateEmail } from "@/utils/validations.util";
import type { UserData } from "@/types/user";
import type {
  ProjectPendingInvitationData,
  ProjectUserData,
} from "@/types/projects";

// OTHERS //
import { toast } from "sonner";

// DATA //
import { getUserAccessInviteInputActionCard } from "@/app/data/user-access.data";

/**
 * Renders the user access management page UI
 */
export default function UserAccessPage() {
  // Define Navigation

  // Define Context
  const {
    projectDetails,
    projectDetailsErrorMessage,
    isProjectDetailsLoading,
  } = useProjectDetailsContext();

  // Define Refs

  // Define States
  const [inviteEmailAddress, setInviteEmailAddress] = useState<string>("");
  const [isInviteRequestLoading, setIsInviteRequestLoading] =
    useState<boolean>(false);
  const [memberItems, setMemberItems] = useState<UserData[]>([]);
  const [usersErrorMessage, setUsersErrorMessage] = useState<string>("");
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false);
  const [hasLoadedUsers, setHasLoadedUsers] = useState<boolean>(false);

  // Helper Functions
  /** Function to handle invite email input changes */
  const handleInviteEmailAddressChange = (value: string): void => {
    setInviteEmailAddress(value);
  };

  /** Function to handle sending invite */
  const handleSendInviteClick = (): void => {
    // Get project ID from project details context
    const projectId = projectDetails?.project.id || "";

    // Basic validation to check if project details are available
    if (!projectDetails?.project.id) {
      toast.error("Project details are not ready yet.");
      return;
    }

    // Basic validation for email address input empty check
    if (inviteEmailAddress.trim() === "") {
      toast.error("Please enter an email address.");
      return;
    }

    // Validate email format
    if (!validateEmail(inviteEmailAddress)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const normalizedInviteEmailData = inviteEmailAddress.trim().toLowerCase();
    const hasExistingActiveOrPendingAccessData = memberItems.some(
      (memberItem) => {
        const normalizedMemberEmailData = memberItem.email.trim().toLowerCase();
        const hasBlockingStatusData = memberItem.status !== "rejected";

        return (
          normalizedMemberEmailData === normalizedInviteEmailData &&
          hasBlockingStatusData
        );
      },
    );

    if (hasExistingActiveOrPendingAccessData) {
      toast.error("This user already has project access or a pending invite.");
      return;
    }

    // Set loading state to true before API call
    setIsInviteRequestLoading(true);

    /** API Call to send user invitation */
    inviteUserRequest(projectId, inviteEmailAddress)
      .then((response) => {
        // Handle API Response
        if (response.status_code === 200) {
          // Success toast
          toast.success(response.message);

          // Clear input field
          setInviteEmailAddress("");

          // Refresh users and invitations list after successful invite
          getAllUsersDetails(projectId);

          return;
        }
        // Error toast
        toast.error(response.message);
      })
      .catch(() => {
        // Error toast
        toast.error("Failed to send invitation.");
      })
      .finally(() => {
        // Set loading state to false after API call is completed
        setIsInviteRequestLoading(false);
      });
  };

  /**
   * Maps project users and pending invitations into table-ready rows.
   */
  const getUserAccessMemberItemsService = (
    userItems: ProjectUserData[],
    invitationItems: ProjectPendingInvitationData[],
  ): UserData[] => {
    const mappedUserItems: UserData[] = userItems.map((userItem) => ({
      id: userItem.id,
      email: userItem.email,
      full_name: userItem.full_name ?? userItem.email,
      avatar_url: null,
      status: userItem.status,
      role: getUserRoleLabelService(userItem.role),
    }));

    const mappedInvitationItems: UserData[] = invitationItems.map(
      (invitationItem) => ({
        id: invitationItem.id,
        email: invitationItem.email,
        full_name: invitationItem.email,
        avatar_url: null,
        status: invitationItem.status === "pending" ? "invited" : "rejected",
        role: getUserRoleLabelService(invitationItem.role),
      }),
    );
    const memberItemMapData = new Map<string, UserData>();

    mappedUserItems.forEach((mappedUserItem) => {
      memberItemMapData.set(mappedUserItem.email.trim().toLowerCase(), {
        ...mappedUserItem,
      });
    });

    mappedInvitationItems.forEach((mappedInvitationItem) => {
      const invitationEmailData = mappedInvitationItem.email.trim().toLowerCase();
      const existingMemberItemData = memberItemMapData.get(invitationEmailData);

      if (!existingMemberItemData) {
        memberItemMapData.set(invitationEmailData, mappedInvitationItem);
        return;
      }

      if (
        existingMemberItemData.status === "rejected" &&
        mappedInvitationItem.status === "invited"
      ) {
        memberItemMapData.set(invitationEmailData, mappedInvitationItem);
      }
    });

    return Array.from(memberItemMapData.values());
  };

  /**
   * Fetches all project users and pending invitations by project ID.
   */
  const getAllUsersDetails = (projectId: string): void => {
    setIsUsersLoading(true);
    setUsersErrorMessage("");

    getAllUsersRequest(projectId)
      .then((response) => {
        if (response.status_code !== 200 || !response.data) {
          setMemberItems([]);
          setUsersErrorMessage(response.message || "Failed to fetch users.");
          return;
        }

        setMemberItems(
          getUserAccessMemberItemsService(
            response.data.users,
            response.data.invitations,
          ),
        );
      })
      .catch(() => {
        setMemberItems([]);
        setUsersErrorMessage("Failed to fetch users.");
      })
      .finally(() => {
        setIsUsersLoading(false);
        setHasLoadedUsers(true);
      });
  };

  const inviteInputActionCardItem = getUserAccessInviteInputActionCard();

  // Use Effects
  useEffect(() => {
    const projectId = projectDetails?.project.id;

    if (!projectId) {
      return;
    }

    setHasLoadedUsers(false);
    getAllUsersDetails(projectId);
  }, [projectDetails?.project.id]);

  return (
    <section className="flex flex-col gap-11 px-6 py-8 md:gap-9 md:px-9 md:py-10">
      {/* PageIntro Component */}
      <PageIntro
        title="User Access Management"
        description="Manage and invite collaborators to your project structure."
      />

      {/* Input Action Card Component */}
      <InputActionCard
        title={inviteInputActionCardItem.title}
        description={inviteInputActionCardItem.description}
        inputIcon={inviteInputActionCardItem.inputIcon}
        label={inviteInputActionCardItem.label}
        placeholder={inviteInputActionCardItem.placeholder}
        type={inviteInputActionCardItem.type}
        value={inviteEmailAddress}
        onValueChange={handleInviteEmailAddressChange}
        buttonOneClick={handleSendInviteClick}
        buttonOneIcon={inviteInputActionCardItem.buttonOneIcon}
        buttonOneText={
          isInviteRequestLoading ? "Sending Invite..." : "Send Invite"
        }
      />

      {isProjectDetailsLoading ? (
        <p className="text-sm text-n-600">Loading project details...</p>
      ) : null}

      {projectDetailsErrorMessage ? (
        <p className="text-sm text-red-600">{projectDetailsErrorMessage}</p>
      ) : null}

      {isUsersLoading && memberItems.length === 0 ? (
        <p className="text-sm text-n-600">Loading users...</p>
      ) : null}

      {usersErrorMessage ? (
        <p className="text-sm text-red-600">{usersErrorMessage}</p>
      ) : null}

      {/* UsersTable Component */}
      {!usersErrorMessage &&
      !isProjectDetailsLoading &&
      hasLoadedUsers &&
      !isUsersLoading ? (
        memberItems.length > 0 ? (
          <UsersTable memberItems={memberItems} />
        ) : (
          <p className="text-sm text-n-600">No Members Found.</p>
        )
      ) : null}
    </section>
  );
}
