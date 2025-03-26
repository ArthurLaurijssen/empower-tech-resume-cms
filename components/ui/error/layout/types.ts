/**
 * Interface that defines the properties accepted by the error page header components.
 */
export interface ErrorPageProps {
  /**
   * A string representing the HTTP status code or error code (e.g., "404").
   */
  code: string;

  /**
   * A short, user-friendly title describing the nature of the error (e.g., "Developer Not Found").
   */
  title: string;

  /**
   * A brief description or explanation of the error to help users understand what went wrong.
   */
  description: string;

  /**
   * The ID of the resource involved in the error, if applicable (e.g., a Developer ID).
   */
  id?: string;

  /**
   * An optional reason or more detailed cause of the error that may help users or support staff.
   */
  reason?: string;
}
