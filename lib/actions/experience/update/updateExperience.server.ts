"use server";

import { ExperienceFormData } from "@/lib/actions/experience/types";
import { UpdateExperienceResponse } from "@/lib/actions/experience/update/types";
import { ExperienceService } from "@/lib/services/experience/ExperienceService";

/**
 * Updates an experience for a developer.
 *
 * @param developerId - The unique identifier of the developer.
 * @param experienceId - The unique identifier of the experience to be updated.
 * @param data - The updated experience data.
 * @returns A promise that resolves to an UpdateExperienceResponse object.
 */
export async function updateExperienceAction(
  developerId: string,
  experienceId: string,
  data: ExperienceFormData,
): Promise<UpdateExperienceResponse> {
  try {
    await ExperienceService.updateExperience(developerId, experienceId, data);

    return {
      success: true,
      message: `Experience updated successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
