import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { Experience } from "@/models/entities/Experience";

/**
 * Service class for handling bulk Experience-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class ExperiencesService extends AuthenticatedApiService {
  /** Base URL for Experiences API endpoint */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/developer/{developerId}/experiences`;

  /**
   * Retrieves all experiences for a developer.
   * @param developerId - The ID of the developer
   * @returns Promise resolving to an array of Experience objects
   * @throws Error if the request fails or returns no data
   */
  static async getAllExperiences(developerId: string): Promise<Experience[]> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<Experience[]>(
      `${apiURL}`,
      {
        method: "GET",
      },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to get experiences");
    }

    return response.data;
  }
}
