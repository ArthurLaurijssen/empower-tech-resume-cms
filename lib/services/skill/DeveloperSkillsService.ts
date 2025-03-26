import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

/**
 * Service class for handling bulk Developer Skills-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class DeveloperSkillsService extends AuthenticatedApiService {
  /** Base URL for Developer Skills API endpoint */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/Developer/{developerId}/skills`;

  /**
   * Retrieves all skills with associated projects for a developer.
   * @param developerId - The ID of the developer
   * @returns Promise resolving to an array of DeveloperSkill objects, including project data
   * @throws Error if the request fails or returns no data
   */
  static async getAllDeveloperSkillsWithProjects(
    developerId: string,
  ): Promise<DeveloperSkill[]> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<DeveloperSkill[]>(
      `${apiURL}/with-projects`,
      {
        method: "GET",
      },
    );

    if (!response.success || !response.data) {
      throw new Error(
        response.message || "Failed to get developer skills with projects",
      );
    }

    return response.data;
  }
}
