"use server";

import { DeleteSocialMediaLinkResponse } from "./types";
import { SocialMediaLinkService } from "@/lib/services/social-media/SocialMediaLinkService";

/**
 * Deletes a social media link for a developer.
 *
 * @param developerId - The unique identifier of the developer.
 * @param network - The name of the social media network to be deleted.
 * @returns A promise that resolves to a DeleteSocialMediaLinkResponse object.
 */
export async function deleteSocialMediaLinkAction(
  developerId: string,
  network: string,
): Promise<DeleteSocialMediaLinkResponse> {
  try {
    await SocialMediaLinkService.deleteSocialMediaLink(developerId, network);

    return {
      success: true,
      message: `Social media link for ${network} deleted successfully`,
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
