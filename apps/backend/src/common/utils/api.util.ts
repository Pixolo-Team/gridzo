/**
 * Creates a success API payload with optional metadata.
 */
export function successResponse<T>(data: T, message = "Success") {
  return {
    data,
    error: null,
    message,
  };
}

/**
 * Creates an error API payload with a predictable structure.
 */
export function errorResponse(message: string, details: unknown = null) {
  return {
    data: null,
    error: {
      message,
      details,
    },
    message,
  };
}
