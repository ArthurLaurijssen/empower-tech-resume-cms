"use server";

import { ProjectService } from "@/lib/services/project/ProjectService";
import { DeleteProjectResponse } from "@/lib/actions/project/delete/types";

/**
 * Deletes a project for a developer under a specific skill.
 *
 * @param developerId - The unique identifier of the developer.
 * @param skillId - The unique identifier of the skill associated with the project.
 * @param projectId - The unique identifier of the project to be deleted.
 * @returns A promise that resolves to a DeleteProjectResponse object.
 */
export async function deleteProjectAction(
  developerId: string,
  skillId: string,
  projectId: string,
): Promise<DeleteProjectResponse> {
  try {
    await ProjectService.deleteProject(developerId, skillId, projectId);

    return {
      success: true,
      message: `Project with id: ${projectId} deleted successfully`,
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
