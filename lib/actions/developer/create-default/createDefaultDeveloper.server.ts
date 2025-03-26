"use server";
import { CreateDeveloperResponse } from "@/lib/actions/developer/create-default/types";
import { DeveloperService } from "@/lib/services/developer/DeveloperService";

/**
 * Creates a new default developer using the DeveloperServiceTs.
 *
 * @returns A promise that resolves to an object indicating the success of the operation.
 *          If successful, the object's `developerId` property contains the newly created developer's ID.
 *          If unsuccessful, the `toast` property contains a descriptive message.
 */
export async function createDeveloperAction(): Promise<CreateDeveloperResponse> {
  try {
    // Attempt to retrieve the access token for authorization
    const data = await DeveloperService.createDefaultDeveloper();

    return {
      success: true,
      developerId: data.developerId,
    };
  } catch (error) {
    // If any toast occurs, handle gracefully by returning success: false and the toast message
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected toast occurred",
    };
  }
}
