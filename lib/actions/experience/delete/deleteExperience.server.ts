"use server";

import { DeleteExperienceResponse } from "@/lib/actions/experience/delete/types";
import { ExperienceService } from "@/lib/services/experience/ExperienceService";

/**
 * Deletes an experience for a developer.
 *
 * @param developerId - The unique identifier of the developer.
 * @param experienceId - The unique identifier of the experience to be deleted.
 * @returns A promise that resolves to a DeleteExperienceResponse object.
 */
export async function deleteExperienceAction(
  developerId: string,
  experienceId: string,
): Promise<DeleteExperienceResponse> {
  try {
    await ExperienceService.deleteExperience(developerId, experienceId);

    return {
      success: true,
      message: `Experience with id ${experienceId} deleted successfully`,
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
