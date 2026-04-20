export interface LandingPageProblemCardData {
  description: string;
  title: string;
  tone: "blue" | "red" | "violet";
}

export interface LandingPageStepData {
  description: string;
  stepNumber: string;
  title: string;
  tone: "blue" | "violet";
}

export interface LandingPageFeatureCardData {
  description: string;
  iconName:
    | "activity-logs"
    | "api-gen"
    | "instant-deploy"
    | "mapping"
    | "project-management"
    | "sheets-integration";
  title: string;
}

export interface LandingPageAudienceCardData {
  bulletItems: string[];
  description: string;
  eyebrow: string;
  title: string;
  tone: "blue" | "violet";
}

export interface LandingPageFooterGroupData {
  label: string;
  linkItems: {
    href: string;
    label: string;
  }[];
}

export interface LandingPageDetailsData {
  audienceSectionDetails: {
    cardItems: LandingPageAudienceCardData[];
  };
  ctaSectionDetails: {
    description: string;
    footnote: string;
    title: string;
  };
  featureSectionDetails: {
    cardItems: LandingPageFeatureCardData[];
    title: string;
  };
  footerSectionDetails: {
    copyrightText: string;
    description: string;
    groupItems: LandingPageFooterGroupData[];
    title: string;
  };
  heroSectionDetails: {
    ctaLabel: string;
    demoLabel: string;
    description: string;
    eyebrow: string;
    imageAlt: string;
    imageUrl: string;
    title: string;
    titleAccent: string;
  };
  previewSectionDetails: {
    activityDescription: string;
    activityImageAlt: string;
    activityImageUrl: string;
    activityTitle: string;
    editorDescription: string;
    editorImageAlt: string;
    editorImageUrl: string;
    editorTitle: string;
  };
  problemSectionDetails: {
    cardItems: LandingPageProblemCardData[];
    title: string;
  };
  stepSectionDetails: {
    stepItems: LandingPageStepData[];
  };
}

export const landingPageDetails: LandingPageDetailsData = {
  heroSectionDetails: {
    eyebrow: "The Google Sheets CMS",
    title: "Build dynamic websites using Google Sheets",
    titleAccent: " without a CMS",
    description:
      "Transform your spreadsheets into a powerful headless CMS. Edit data in real-time, generate clean APIs, and deploy modern frontends without the complexity of traditional database management.",
    ctaLabel: "Start Building Free",
    demoLabel: "View Demo",
    imageAlt: "Gridzo dashboard preview",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/c90fc37e-da30-4d12-888c-fcd09752e5f5",
  },
  problemSectionDetails: {
    title: "Why old CMS workflows fail",
    cardItems: [
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
    ],
  },
  featureSectionDetails: {
    title: "Architectural Power",
    cardItems: [
      {
        iconName: "project-management",
        title: "Project Mgmt",
        description:
          "Organize multiple websites and sheets in a unified dashboard designed for scale.",
      },
      {
        iconName: "sheets-integration",
        title: "Sheets Integration",
        description:
          "Bi-directional sync supports complex formulas and multiple tabs natively.",
      },
      {
        iconName: "api-gen",
        title: "API Gen",
        description:
          "Auto-generated documentation and playground for your custom content API.",
      },
      {
        iconName: "mapping",
        title: "Mapping",
        description:
          "Transform messy spreadsheet data into perfectly structured JSON objects.",
      },
      {
        iconName: "instant-deploy",
        title: "Instant Deploy",
        description:
          "Webhook support for major hosting providers to trigger rebuilds on content changes.",
      },
      {
        iconName: "activity-logs",
        title: "Activity Logs",
        description:
          "Full audit trail of every update, sync, and API request for total transparency.",
      },
    ],
  },
  stepSectionDetails: {
    stepItems: [
      {
        stepNumber: "1",
        title: "Connect Sheet",
        tone: "blue",
        description:
          "Link any Google Sheet to Gridzo with a single click and secure OAuth.",
      },
      {
        stepNumber: "2",
        title: "Define Structure",
        tone: "blue",
        description:
          "Map your sheet columns to JSON fields, including images, booleans, and markdown.",
      },
      {
        stepNumber: "3",
        title: "Generate API",
        tone: "blue",
        description:
          "Instantly get a production-ready REST endpoint for your frontend.",
      },
      {
        stepNumber: "4",
        title: "Deploy Instantly",
        tone: "violet",
        description:
          "Sync updates in real-time or via build hooks for Vercel, Netlify, or AWS.",
      },
    ],
  },
  audienceSectionDetails: {
    cardItems: [
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
    ],
  },
  previewSectionDetails: {
    editorTitle: "Structure Editor",
    editorDescription:
      "Fine-tune your data mapping with our visual editor. Define relations and media fields effortlessly.",
    editorImageAlt: "Structure editor preview",
    editorImageUrl:
      "https://www.figma.com/api/mcp/asset/90722731-17c9-4b62-8747-651b869ea820",
    activityTitle: "Activity Audit",
    activityDescription:
      "Track every change from your Google Sheet and see when your API endpoints were last hit.",
    activityImageAlt: "Activity audit preview",
    activityImageUrl:
      "https://www.figma.com/api/mcp/asset/88a18033-7bb8-4217-9045-16e1eb2e9943",
  },
  ctaSectionDetails: {
    title: "Start building smarter websites today",
    description:
      "Join Gridzo developers turning spreadsheets into software and ship a cleaner content workflow from day one.",
    footnote: "No credit card required. Setup in 2 minutes.",
  },
  footerSectionDetails: {
    title: "Gridzo",
    description:
      "The architectural web bridge between Google Sheets and modern development.",
    copyrightText: "© 2024 Gridzo. Built for the architectural web.",
    groupItems: [
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
    ],
  },
};
