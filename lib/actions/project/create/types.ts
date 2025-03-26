/**
 * Represents the response from the createProjectAction.
 */
export type CreateProjectResponse = {
  /** The unique identifier of the created project, if successful. */
  projectId?: string;
  /** Indicates whether the creation operation was successful. */
  success: boolean;
  /** A message describing the result of the operation. */
  message: string;
};
