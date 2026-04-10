// TYPES //
import type { InputActionCardData } from "@/components/ui/InputActionCard";
import type { UserData } from "@/types/user";

// COMPONENTS //
import MailSendEmailMessage from "@/components/icons/neevo-icons/MailSendEmailMessage";
import MailSendEnvelope from "@/components/icons/neevo-icons/MailSendEnvelope";

/**
 * Builds the user access invite card content
 */
export function getUserAccessInviteInputActionCard(): InputActionCardData {
  return {
    title: "Invite a User",
    description:
      "Editors can modify project layouts and manage structural configurations.",
    label: "Email Address",
    placeholder: "colleague@company.com",
    type: "email",
    inputIcon: MailSendEnvelope,
    buttonOneText: "Send Invite",
    buttonOneIcon: MailSendEmailMessage,
  };
}

/** Seed members shown in the user access table UI */
export const userAccessMemberItemsData: UserData[] = [
  {
    id: "sarah-johnson",
    email: "SarahJohnson@mail.com",
    full_name: "Sarah Johnson",
    avatar_url: null,
    status: "active",
    role: "Owner",
  },
  {
    id: "michael-lee",
    email: "michael.lee@example.com",
    full_name: "Michael Lee",
    avatar_url: null,
    status: "inactive",
    role: "Manager",
  },
  {
    id: "emily-davis",
    email: "emily.davis@example.com",
    full_name: "Emily Davis",
    avatar_url: null,
    status: "active",
    role: "Member",
  },
];
