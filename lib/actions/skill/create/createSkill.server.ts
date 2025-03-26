"use server";

import { CreateSkillResponse } from "@/lib/actions/skill/create/types";
import { DeveloperSkillService } from "@/lib/services/skill/DeveloperSkillService";
import { SkillFormData } from "@/lib/actions/skill/types";

/**
 * Adds a new skill to a developer's profile.
 *
 * @param developerId - The unique identifier of the developer.
 * @param data - The skill data to be added.
 * @returns A promise that resolves to a CreateSkillResponse object.
 */
export async function addSkillAction(
  developerId: string,
  data: SkillFormData,
): Promise<CreateSkillResponse> {
  try {
    const createSkillData = await DeveloperSkillService.createDeveloperSkill(
      developerId,
      data,
    );
    return {
      success: true,
      message: `Skill with id: ${createSkillData.skillId} added successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
