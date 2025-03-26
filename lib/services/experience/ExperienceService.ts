import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { ExperienceFormData } from "@/lib/actions/experience/types";
import { CreateExperienceData } from "@/lib/types/experience/CreateExperienceData";

/**
 * Service class for handling Experience-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class ExperienceService extends AuthenticatedApiService {
  /** Base URL for Experience API endpoints */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/developer/{developerId}/experience`;

  /**
   * Creates a new experience for a developer.
   * @param developerId - The ID of the developer
   * @param data - The experience data to be created
   * @returns Promise resolving to the created experience data
   */
  static async createExperience(
    developerId: string,
    data: ExperienceFormData,
  ): Promise<CreateExperienceData> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<CreateExperienceData>(
      apiURL,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create Experience");
    }

    return response.data;
  }

  /**
   * Updates an existing experience for a developer.
   * @param developerId - The ID of the developer
   * @param experienceId - The ID of the experience to update
   * @param data - The updated experience data
   */
  static async updateExperience(
    developerId: string,
    experienceId: string,
    data: ExperienceFormData,
  ): Promise<void> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<void>(
      `${apiURL}/${experienceId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to update experience");
    }
  }

  /**
   * Deletes an experience for a developer.
   * @param developerId - The ID of the developer
   * @param experienceId - The ID of the experience to delete
   */
  static async deleteExperience(
    developerId: string,
    experienceId: string,
  ): Promise<void> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<void>(
      `${apiURL}/${experienceId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete experience");
    }
  }
}
