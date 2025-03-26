"use server";

import { DeleteSkillResponse } from "@/lib/actions/skill/delete/types";
import { DeveloperSkillService } from "@/lib/services/skill/DeveloperSkillService";

/**
 * Deletes a skill from a developer's profile.
 *
 * @param developerId - The unique identifier of the developer.
 * @param skillId - The unique identifier of the skill to be deleted.
 * @returns A promise that resolves to a DeleteSkillResponse object.
 */
export async function deleteSkillAction(
  developerId: string,
  skillId: string,
): Promise<DeleteSkillResponse> {
  try {
    await DeveloperSkillService.deleteDeveloperSkill(developerId, skillId);

    return {
      success: true,
      message: `Skill with id: ${skillId} deleted successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
