/**
 * Default role assigned to newly invited project members.
 */
export const DEFAULT_INVITATION_ROLE = "viewer" as const;

/**
 * Number of days before a project invitation expires.
 */
export const INVITATION_EXPIRY_DAYS = 7;

/**
 * Milliseconds in a single day.
 */
export const MS_PER_DAY = 24 * 60 * 60 * 1000;
