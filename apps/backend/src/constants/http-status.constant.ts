/**
 * Standard HTTP status code constants used across controllers.
 */
export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
