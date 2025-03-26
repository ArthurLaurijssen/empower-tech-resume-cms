/**
 * Represents the response from a developer deletion action.
 */
export type DeleteDeveloperResponse = {
  /**
   * Indicates whether the developer deletion was successful.
   */
  success: boolean;

  /**
   * Error message if the developer deletion fails.
   * This will be populated when success is false.
   */
  error?: string;

  /**
   * Success message providing additional information about the deletion.
   * This will be populated when success is true.
   */
  message?: string;
};
