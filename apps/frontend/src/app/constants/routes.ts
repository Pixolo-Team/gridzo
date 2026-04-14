// Routes for the application
export const ROUTES = {
  APP: {
    HOME: "/",
    COMPONENT_LIBRARY: "/component-library",
    DASHBOARD: "/dashboard",
    PROJECTS: {
      DETAIL: (projectId: string): string => `/projects/${projectId}`,
      DETAIL_PATTERN: "/projects/[projectId]",
      STRUCTURE: (projectId: string): string =>
        `/projects/${projectId}/structure`,
      STRUCTURE_PATTERN: "/projects/[projectId]/structure",
      USER_ACCESS: (projectId: string): string =>
        `/projects/${projectId}/user-access`,
      USER_ACCESS_PATTERN: "/projects/[projectId]/user-access",
      EDIT: (projectId: string): string => `/projects/${projectId}/edit`,
      EDIT_PATTERN: "/projects/[projectId]/edit",
      CREATE: "/projects/create",
      CREATE_SUCCESS: "/projects/create/success",
    },
  },
  AUTH: {
    LOGIN: "/login",
    CALLBACK: "/auth/callback",
  },
  LEGAL: {
    PRIVACY_POLICY: "/privacy-policy",
    SUPPORT: "/support",
    TERMS_OF_SERVICE: "/terms-of-service",
  },
} as const;
