/**
 * Standard service response envelope for Supabase query operations.
 */
export type QueryResponseData<T> = {
  data: T | null;
  error: Error | null;
};
