/**
 * Represents the response from the createDeveloperAction function.
 */
export type CreateDeveloperResponse = {
  /**
   * Indicates whether the developer creation was successful.
   */
  success: boolean;

  /**
   * Error message if the developer creation fails.
   * This will be populated when success is false.
   */
  error?: string;

  /**
   * The ID of the newly created developer.
   * This will be populated when success is true.
   */
  developerId?: string;
};
