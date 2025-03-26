/**
 * Represents the response from the createExperienceAction.
 */
export type CreateExperienceResponse = {
  /** The unique identifier of the created experience, if successful. */
  experienceId?: string;
  /** Indicates whether the creation operation was successful. */
  success: boolean;
  /** A message describing the result of the operation. */
  message: string;
};
