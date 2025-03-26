/**
 * Represents the response from the createSocialMediaLinkAction.
 */
export type CreateSocialMediaLinkResponse = {
  /** The unique identifier of the created social media link, if successful. */
  socialMediaLinkId?: string;
  /** Indicates whether the creation operation was successful. */
  success: boolean;
  /** A message describing the result of the operation. */
  message: string;
};
