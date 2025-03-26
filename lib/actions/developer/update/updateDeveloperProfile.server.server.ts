"use server";

import { UpdateDeveloperResponse } from "@/lib/actions/developer/update/types";
import { DeveloperService } from "@/lib/services/developer/DeveloperService";
import { DeveloperProfileFormData } from "@/lib/actions/developer/types";

/**
 * Updates a developer's profile information.
 *
 * @param developerId - The unique identifier of the developer to update.
 * @param data - The new profile data for the developer.
 * @returns A promise that resolves to an UpdateDeveloperResponse object.
 */
export async function updateDeveloperProfileAction(
  developerId: string,
  data: DeveloperProfileFormData,
): Promise<UpdateDeveloperResponse> {
  try {
    await DeveloperService.updateDeveloper(developerId, data);

    return {
      success: true,
      message: "Developer profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
