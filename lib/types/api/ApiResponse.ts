/**
 * Represents the backend API response structure.
 *
 * @template T The type of the data returned in the response.
 */
export interface ApiResponse<T> {
  /** The payload returned from the API. */
  data: T;
  /** Whether the API call was successful. */
  success: boolean;
  /** A message returned by the API. */
  message: string;
}
