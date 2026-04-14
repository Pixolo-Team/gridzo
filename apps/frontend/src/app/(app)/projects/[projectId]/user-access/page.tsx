"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import UsersTable from "@/components/projects/user-access/UsersTable";
import InputActionCard from "@/components/ui/InputActionCard";
import PageIntro from "@/components/ui/PageIntro";

// API SERVICES //
import { inviteUserRequest } from "@/services/api/projects.api";

// CONTEXTS //
import { useProjectDetailsContext } from "@/contexts/ProjectContext";

// UTILS //
import { validateEmail } from "@/utils/validations.util";

// OTHERS //
import { toast } from "sonner";

// DATA //
import {
  getUserAccessInviteInputActionCard,
  userAccessMemberItemsData,
} from "@/app/data/user-access.data";

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

  // Helper Functions
  /** Function to handle invite email input changes */
  const handleInviteEmailAddressChange = (value: string): void => {
    setInviteEmailAddress(value);
  };

  /** Function to handle sending invite */
  const handleSendInviteClick = (): void => {
    // Get project ID from project details context
    const projectIdData = projectDetails?.project.id || "";

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

    // Set loading state to true before API call
    setIsInviteRequestLoading(true);

    /** API Call to send user invitation */
    inviteUserRequest(projectIdData, inviteEmailAddress)
      .then((response) => {
        // Handle API Response
        if (response.status_code === 200) {
          // Success toast
          toast.success(response.message);

          // Clear input field
          setInviteEmailAddress("");

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

  const inviteInputActionCardData = getUserAccessInviteInputActionCard();

  // Use Effects

  return (
    <section className="flex flex-col gap-11 px-6 py-8 md:gap-9 md:px-9 md:py-10">
      {/* PageIntro Component */}
      <PageIntro
        title="User Access Management"
        description="Manage and invite collaborators to your project structure."
      />

      {/* Input Action Card Component */}
      <InputActionCard
        title={inviteInputActionCardData.title}
        description={inviteInputActionCardData.description}
        inputIcon={inviteInputActionCardData.inputIcon}
        label={inviteInputActionCardData.label}
        placeholder={inviteInputActionCardData.placeholder}
        type={inviteInputActionCardData.type}
        value={inviteEmailAddress}
        onValueChange={handleInviteEmailAddressChange}
        buttonOneClick={handleSendInviteClick}
        buttonOneIcon={inviteInputActionCardData.buttonOneIcon}
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

      {/* UsersTable Component */}
      <UsersTable memberItems={userAccessMemberItemsData} />
    </section>
  );
}
