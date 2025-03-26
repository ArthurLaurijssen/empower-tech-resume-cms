import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { CreateSkillData } from "@/lib/types/skill/CreateSkillData";
import { SkillFormData } from "@/lib/actions/skill/types";

/**
 * Service class for handling Developer Skill-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class DeveloperSkillService extends AuthenticatedApiService {
  /** Base URL for Developer Skill API endpoints */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/Developer/{developerId}/skill`;

  /**
   * Creates a new skill for a developer.
   * @param developerId - The ID of the developer
   * @param data - The skill data to be created
   * @returns Promise resolving to the created skill data
   * @throws Error if the request fails or returns no data
   */
  static async createDeveloperSkill(
    developerId: string,
    data: SkillFormData,
  ): Promise<CreateSkillData> {
    const apiURL = this.API_URL.replace("{developerId}", developerId);
    const response = await this.makeAuthenticatedRequest<CreateSkillData>(
      apiURL,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create developer skill");
    }

    return response.data;
  }

  /**
   * Deletes a skill for a developer.
   * @param developerId - The ID of the developer
   * @param skillId - The ID of the skill to delete
   * @throws Error if the request fails
   */
  static async deleteDeveloperSkill(
    developerId: string,
    skillId: string,
  ): Promise<void> {
    const apiUrl = this.API_URL.replace("{developerId}", developerId);

    const response = await this.makeAuthenticatedRequest<void>(
      `${apiUrl}/${skillId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete developer skill");
    }
  }

  /**
   * Updates a skill for a developer.
   * @param developerId - The ID of the developer
   * @param skillId - The ID of the skill to update
   * @param data - The updated skill data
   * @throws Error if the request fails
   */
  static async updateDeveloperSkill(
    developerId: string,
    skillId: string,
    data: SkillFormData,
  ): Promise<void> {
    const apiUrl = this.API_URL.replace("{developerId}", developerId);

    const response = await this.makeAuthenticatedRequest<void>(
      `${apiUrl}/${skillId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to update developer skill");
    }
  }
}
