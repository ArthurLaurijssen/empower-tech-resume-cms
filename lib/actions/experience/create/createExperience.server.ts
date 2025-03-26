"use server";

import { CreateExperienceResponse } from "@/lib/actions/experience/create/types";
import { ExperienceService } from "@/lib/services/experience/ExperienceService";
import { ExperienceFormData } from "@/lib/actions/experience/types";

/**
 * Creates a new experience for a developer.
 *
 * @param developerId - The unique identifier of the developer.
 * @param data - The experience data to be created.
 * @returns A promise that resolves to a CreateExperienceResponse object.
 */
export async function createExperienceAction(
  developerId: string,
  data: ExperienceFormData,
): Promise<CreateExperienceResponse> {
  try {
    const response = await ExperienceService.createExperience(
      developerId,
      data,
    );

    return {
      experienceId: response.experienceId,
      success: true,
      message: `Experience created successfully`,
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
