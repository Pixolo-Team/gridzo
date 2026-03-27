// Routes for the application
export const ROUTES = {
  APP: {
    COMPONENT_LIBRARY: "/component-library",
    DASHBOARD: "/",
    PROJECTS: {
      DETAIL: (projectId: string): string => `/projects/${projectId}`,
      DETAIL_PATTERN: "/projects/[project-id]",
      EDIT: (projectId: string): string => `/projects/${projectId}/edit`,
      EDIT_PATTERN: "/projects/[project-id]/edit",
      NEW: "/projects/new",
    },
  },
  AUTH: {
    LOGIN: "/login",
  },
  LEGAL: {
    PRIVACY_POLICY: "/privacy-policy",
    SUPPORT: "/support",
    TERMS_OF_SERVICE: "/terms-of-service",
  },
} as const;
