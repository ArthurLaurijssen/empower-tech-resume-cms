"use server";

import { DeveloperSkillService } from "@/lib/services/skill/DeveloperSkillService";
import { SkillFormData } from "@/lib/actions/skill/types";
import { UpdateSkillResponse } from "@/lib/actions/skill/update/types";

/**
 * Updates a skill in a developer's profile.
 *
 * @param developerId - The unique identifier of the developer.
 * @param skillId - The unique identifier of the skill to be updated.
 * @param data - The updated skill data.
 * @returns A promise that resolves to an UpdateSkillResponse object.
 */
export async function updateSkillAction(
  developerId: string,
  skillId: string,
  data: SkillFormData,
): Promise<UpdateSkillResponse> {
  try {
    await DeveloperSkillService.updateDeveloperSkill(
      developerId,
      skillId,
      data,
    );
    return {
      success: true,
      message: `Skill with id: ${skillId} updated successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
