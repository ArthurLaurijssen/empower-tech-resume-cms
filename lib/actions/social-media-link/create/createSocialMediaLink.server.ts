"use server";

import { CreateSocialMediaLinkResponse } from "./types";
import { SocialMediaLinkFormData } from "@/lib/actions/social-media-link/types";
import { SocialMediaLinkService } from "@/lib/services/social-media/SocialMediaLinkService";

/**
 * Creates a new social media link for a developer.
 *
 * @param developerId - The unique identifier of the developer.
 * @param data - The social media link data to be created.
 * @returns A promise that resolves to a CreateSocialMediaLinkResponse object.
 */
export async function createSocialMediaLinkAction(
  developerId: string,
  data: SocialMediaLinkFormData,
): Promise<CreateSocialMediaLinkResponse> {
  console.log(data);
  try {
    const response = await SocialMediaLinkService.createSocialMediaLink(
      developerId,
      data,
    );

    return {
      socialMediaLinkId: response.socialMediaLinkId,
      success: true,
      message: `Social media link created successfully`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
