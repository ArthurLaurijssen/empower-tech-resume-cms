"use server";

import { ProjectFormData } from "@/lib/actions/project/types";
import { ProjectService } from "@/lib/services/project/ProjectService";
import { CreateProjectResponse } from "@/lib/actions/project/create/types";

/**
 * Creates a new project for a developer under a specific skill.
 *
 * @param developerId - The unique identifier of the developer.
 * @param skillId - The unique identifier of the skill associated with the project.
 * @param data - The project data to be created.
 * @returns A promise that resolves to a CreateProjectResponse object.
 */
export async function createProjectAction(
  developerId: string,
  skillId: string,
  data: ProjectFormData,
): Promise<CreateProjectResponse> {
  try {
    const response = await ProjectService.createProject(
      developerId,
      skillId,
      data,
    );

    return {
      projectId: response.projectId,
      success: true,
      message: `Project created successfully`,
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
