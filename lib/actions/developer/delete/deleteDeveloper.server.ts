"use server";
import { DeleteDeveloperResponse } from "@/lib/actions/developer/delete/types";
import { DeveloperService } from "@/lib/services/developer/DeveloperService";

/**
 * Deletes an existing developer identified by the provided developer ID using the DeveloperServiceTs.
 *
 * @param developerId The unique identifier of the developer to delete.
 * @returns A promise that resolves to an object indicating the success of the operation.
 *          If unsuccessful, the `toast` property will contain a descriptive message.
 */
export async function deleteDeveloperAction(
  developerId: string,
): Promise<DeleteDeveloperResponse> {
  try {
    await DeveloperService.deleteDeveloper(developerId);

    return {
      success: true,
      message: "Developer deleted successfully",
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
