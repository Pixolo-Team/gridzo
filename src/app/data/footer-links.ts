// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// Footer link items
export const footerLinkItems = [
  {
    href: ROUTES.LEGAL.PRIVACY_POLICY,
    label: "Privacy Policy",
  },
  {
    href: ROUTES.LEGAL.TERMS_OF_SERVICE,
    label: "Terms of Service",
  },
  {
    href: ROUTES.LEGAL.SUPPORT,
    label: "Support",
  },
] as const;
