/**
 * Represents the structure of social media link form data.
 */
export interface SocialMediaLinkFormData {
  /** The URL of the social media profile. */
  socialMediaUrl: string;
  /** The name of the social media network. */
  socialMediaNetworkName: string;
}

/**
 * Transforms form data into a SocialMediaLinkFormData object.
 * @param formData - The form data to transform.
 * @returns An object of type SocialMediaLinkFormData with the transformed data.
 */
export function transformSocialMediaFormData(
  formData: FormData,
): SocialMediaLinkFormData {
  return {
    // Retrieve the "socialMediaUrl" field value, convert to string, or use an empty string as fallback
    socialMediaUrl: formData.get("socialMediaUrl")?.toString() || "",

    // Retrieve the "network" field value, convert to string, or use an empty string as fallback
    socialMediaNetworkName: formData.get("network")?.toString() || "",
  };
}
