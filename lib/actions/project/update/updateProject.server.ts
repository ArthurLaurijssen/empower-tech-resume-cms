"use server";

import { ProjectService } from "@/lib/services/project/ProjectService";
import { ProjectFormData } from "@/lib/actions/project/types";
import { UpdateProjectResponse } from "@/lib/actions/project/update/types";

/**
 * Updates a project for a developer under a specific skill.
 *
 * @param developerId - The unique identifier of the developer.
 * @param skillId - The unique identifier of the skill associated with the project.
 * @param projectId - The unique identifier of the project to be updated.
 * @param data - The updated project data.
 * @returns A promise that resolves to an UpdateProjectResponse object.
 */
export async function updateProjectAction(
  developerId: string,
  skillId: string,
  projectId: string,
  data: ProjectFormData,
): Promise<UpdateProjectResponse> {
  try {
    await ProjectService.updateProject(developerId, skillId, projectId, data);

    return {
      success: true,
      message: `Project updated successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
