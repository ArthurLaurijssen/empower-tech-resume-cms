import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { SocialMediaLink } from "@/models/entities/SocialMediaLink";
import { SocialMediaLinkFormData } from "@/lib/actions/social-media-link/types";
import { CreateSocialMediaLinkData } from "@/lib/types/social-media/CreateSocialMediaLinkData";

/**
 * Service class for handling Social Media Link-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class SocialMediaLinkService extends AuthenticatedApiService {
  /** Base URL for Social Media Link API endpoints */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/developer/{developerId}/social-media`;

  /**
   * Creates a new social media link for a developer.
   * @param developerId - The ID of the developer
   * @param data - The social media link data to be created
   * @returns Promise resolving to the created social media link data
   * @throws Error if the request fails or returns no data
   */
  static async createSocialMediaLink(
    developerId: string,
    data: SocialMediaLinkFormData,
  ): Promise<CreateSocialMediaLinkData> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);

    const response =
      await this.makeAuthenticatedRequest<CreateSocialMediaLinkData>(apiURL, {
        method: "POST",
        body: JSON.stringify(data),
      });

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create social media link");
    }

    return response.data;
  }

  /**
   * Deletes a social media link for a developer.
   * @param developerId - The ID of the developer
   * @param network - The name of the social media network to delete
   * @throws Error if the request fails
   */
  static async deleteSocialMediaLink(
    developerId: string,
    network: string,
  ): Promise<void> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<void>(
      `${apiURL}?network=${network}`,
      {
        method: "DELETE",
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete social media link");
    }
  }

  /**
   * Retrieves all social media links for a developer.
   * @param developerId - The ID of the developer
   * @returns Promise resolving to an array of SocialMediaLink objects
   * @throws Error if the request fails or returns no data
   */
  static async getAllSocialMediaLinks(
    developerId: string,
  ): Promise<SocialMediaLink[]> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<SocialMediaLink[]>(
      apiURL,
      {
        method: "GET",
      },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to get social media links");
    }

    return response.data;
  }
}
