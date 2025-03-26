import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { ProjectFormData } from "@/lib/actions/project/types";
import { CreateProjectData } from "@/lib/types/project/CreateProjectData";

/**
 * Service class for handling Project-related API operations.
 * Extends AuthenticatedApiService to use authenticated requests.
 */
export class ProjectService extends AuthenticatedApiService {
  /** Base URL for Project API endpoints */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/developer/{developerId}/skill/{skillId}/project`;

  /**
   * Creates a new project for a developer's skill.
   * @param developerId - The ID of the developer
   * @param skillId - The ID of the skill
   * @param data - The project data to be created
   * @returns Promise resolving to the created project data
   * @throws Error if the request fails or returns no data
   */
  static async createProject(
    developerId: string,
    skillId: string,
    data: ProjectFormData,
  ): Promise<CreateProjectData> {
    const apiURL = this.API_URL.replace("{developerId}", developerId).replace(
      "{skillId}",
      skillId,
    );
    const response = await this.makeAuthenticatedRequest<CreateProjectData>(
      apiURL,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create Project");
    }

    return response.data;
  }

  /**
   * Updates an existing project for a developer's skill.
   * @param developerId - The ID of the developer
   * @param skillId - The ID of the skill
   * @param projectId - The ID of the project to update
   * @param data - The updated project data
   * @throws Error if the request fails
   */
  static async updateProject(
    developerId: string,
    skillId: string,
    projectId: string,
    data: ProjectFormData,
  ): Promise<void> {
    const apiURL = this.API_URL.replace("{developerId}", developerId).replace(
      "{skillId}",
      skillId,
    );
    const response = await this.makeAuthenticatedRequest<void>(
      `${apiURL}/${projectId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to update project");
    }
  }

  /**
   * Deletes a project from a developer's skill.
   * @param developerId - The ID of the developer
   * @param skillId - The ID of the skill
   * @param projectId - The ID of the project to delete
   * @throws Error if the request fails
   */
  static async deleteProject(
    developerId: string,
    skillId: string,
    projectId: string,
  ): Promise<void> {
    const apiURL = this.API_URL.replace("{developerId}", developerId).replace(
      "{skillId}",
      skillId,
    );
    const response = await this.makeAuthenticatedRequest<void>(
      `${apiURL}/${projectId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete project");
    }
  }
}
