"use client";

// COMPONENTS //
import UsersTable from "@/components/projects/user-access/UsersTable";
import InputActionCard from "@/components/ui/InputActionCard";
import PageIntro from "@/components/ui/PageIntro";
import MailSendEmailMessage from "@/components/icons/neevo-icons/MailSendEmailMessage";
import MailSendEnvelope from "@/components/icons/neevo-icons/MailSendEnvelope";

// DATA //
import { userAccessMemberItemsData } from "@/app/data/user-access.data";

/**
 * Renders the user access management page UI
 */
export default function UserAccessPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /** Function to handle sending invite */
  const handleSendInviteClick = () => {
    // Logic to send invite would go here, such as form validation and API call
    console.log("Send Invite button clicked");
  };

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
        title={"Invite a User"}
        description={
          "Editors can modify project layouts and manage structural configurations."
        }
        inputIcon={MailSendEnvelope}
        label={"Email Address"}
        placeholder={"example@company.com"}
        type={"email"}
        buttonOneClick={handleSendInviteClick}
        buttonOneIcon={MailSendEmailMessage}
        buttonOneText={"Send Invite"}
      />

      {/* UsersTable Component */}
      <UsersTable memberItems={userAccessMemberItemsData} />
    </section>
  );
}
