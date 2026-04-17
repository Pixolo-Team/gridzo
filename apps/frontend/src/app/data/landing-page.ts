export interface LandingPageProblemCardData {
  description: string;
  title: string;
  tone: "blue" | "red" | "violet";
}

export interface LandingPageStepData {
  description: string;
  stepNumber: string;
  title: string;
}

export interface LandingPageFeatureCardData {
  description: string;
  title: string;
}

export interface LandingPageAudienceCardData {
  description: string;
  eyebrow: string;
  title: string;
  tone: "blue" | "violet";
  bulletItems: string[];
}

export interface LandingPageFooterGroupData {
  label: string;
  linkItems: {
    href: string;
    label: string;
  }[];
}

export const landingPageProblemCardItemsData: LandingPageProblemCardData[] = [
  {
    title: "Expensive CMS Development",
    description:
      "Traditional headless CMS tools cost thousands in licensing and custom development hours just to set up basic schemas.",
    tone: "red",
  },
  {
    title: "Non-technical Clients Struggle",
    description:
      "Teaching clients to use complex admin panels is a nightmare. They just want to edit text in a spreadsheet.",
    tone: "blue",
  },
  {
    title: "Too Much Infrastructure",
    description:
      "Stop managing databases, auth layers, and hosting for simple content-driven sites. Use the cloud you already own.",
    tone: "violet",
  },
];

export const landingPageStepItemsData: LandingPageStepData[] = [
  {
    stepNumber: "1",
    title: "Connect Sheet",
    description:
      "Link any Google Sheet to Gridzo with a single click and secure OAuth.",
  },
  {
    stepNumber: "2",
    title: "Define Structure",
    description:
      "Map your sheet columns to JSON fields, including images, booleans, and markdown.",
  },
  {
    stepNumber: "3",
    title: "Generate API",
    description:
      "Instantly get a production-ready GraphQL or REST endpoint for your frontend.",
  },
  {
    stepNumber: "4",
    title: "Deploy Instantly",
    description:
      "Ship content updates fast without rebuilding your content tooling every time.",
  },
];

export const landingPageFeatureCardItemsData: LandingPageFeatureCardData[] = [
  {
    title: "Project-ready",
    description:
      "Manage multiple website and app content structures from one place.",
  },
  {
    title: "Sheet Integration",
    description:
      "Connect your content source directly from Google Sheets without migration.",
  },
  {
    title: "API Driven",
    description:
      "Push content to your frontend through production-friendly JSON endpoints.",
  },
  {
    title: "Mapping",
    description:
      "Transform spreadsheet columns into nested content structures and reusable shapes.",
  },
  {
    title: "Instant Deploy",
    description:
      "Publish updated JSON after making changes without touching code or hosting.",
  },
  {
    title: "Activity Logs",
    description:
      "Keep track of content updates, user actions, and sync moments across the project.",
  },
];

export const landingPageAudienceCardItemsData: LandingPageAudienceCardData[] = [
  {
    eyebrow: "For Developers",
    title: "Ship faster with spreadsheet-backed content APIs",
    description:
      "Build with the tools you already love while Gridzo handles your content bridge.",
    tone: "blue",
    bulletItems: [
      "Fast onboarding for new projects and client handoff",
      "JSON output tailored for headless frontend consumption",
      "No custom CMS build needed for small, fast-moving sites",
    ],
  },
  {
    eyebrow: "For Clients",
    title: "Edit website content from a sheet you already know",
    description:
      "Let clients update content without admin-panel training or complex workflows.",
    tone: "violet",
    bulletItems: [
      "No technical learning curve before edits go live",
      "Familiar Google Sheets workflow from desktop or mobile",
      "Fewer mistakes because the interface already feels natural",
    ],
  },
];

export const landingPageFooterGroupItemsData: LandingPageFooterGroupData[] = [
  {
    label: "Product",
    linkItems: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Demo", href: "#product-preview" },
    ],
  },
  {
    label: "Legal",
    linkItems: [
      { label: "Terms", href: "/terms-of-service" },
      { label: "Privacy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Connect",
    linkItems: [
      { label: "Support", href: "/support" },
      { label: "Login", href: "/login" },
    ],
  },
];
