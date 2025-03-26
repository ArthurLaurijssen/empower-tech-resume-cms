import { Developer } from "@/models/entities/Developer";
import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";
import { CreateDeveloperData } from "@/lib/types/developer/CreateDeveloperData";
import { InvalidFormatError } from "@/lib/types/errors/InvalidFormatError";
import { DeveloperProfileFormData } from "@/lib/actions/developer/types";

/**
 * Service class for handling operations related to a single developer.
 */
export class DeveloperService extends AuthenticatedApiService {
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/Developer`;

  /**
   * Retrieves a developer by their unique identifier.
   *
   * @param developerId The unique ID of the developer to retrieve
   * @throws {BaseError} For other API errors
   */
  static async getDeveloperById(developerId: string): Promise<Developer> {
    if (!developerId?.trim()) {
      throw new InvalidFormatError("Developer ID is required");
    }

    const response = await this.makeAuthenticatedRequest<Developer>(
      `${this.API_URL}/${developerId}`,
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to retrieve developer");
    }

    return response.data;
  }

  /**
   * Creates a new developer with default properties.
   *
   *
   * @throws {BaseError} For other API errors
   */
  static async createDefaultDeveloper(): Promise<CreateDeveloperData> {
    const response = await this.makeAuthenticatedRequest<CreateDeveloperData>(
      `${this.API_URL}/add-new-default`,
      { method: "POST" },
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create developer");
    }

    return response.data;
  }

  /**
   * Updates a developer's profile information.
   *
   * @param developerId The ID of the developer to update
   * @param data The updated developer profile data
   * @throws {InvalidFormatError} When developerId is not provided
   * @throws {BaseError} For other API errors
   */
  static async updateDeveloper(
    developerId: string,
    data: DeveloperProfileFormData,
  ): Promise<void> {
    if (!developerId?.trim()) {
      throw new InvalidFormatError("Developer ID is required");
    }

    const response = await this.makeAuthenticatedRequest<void>(
      `${this.API_URL}/${developerId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to update developer");
    }
  }

  /**
   * Deletes a developer by their unique identifier.
   *
   * @param developerId The ID of the developer to delete
   * @throws {InvalidFormatError} When developerId is not provided
   * @throws {NotAuthorizedError} When user lacks admin access
   * @throws {BaseError} For other API errors
   */
  static async deleteDeveloper(developerId: string): Promise<void> {
    if (!developerId?.trim()) {
      throw new InvalidFormatError("Developer ID is required");
    }

    const response = await this.makeAuthenticatedRequest<void>(
      `${this.API_URL}/${developerId}`,
      { method: "DELETE" },
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete developer");
    }
  }

  /**
   * Retrieves a developer with full details by their unique identifier.
   *
   * @param developerId The ID of the developer to retrieve
   * @throws {InvalidFormatError} When developerId is not provided
   * @throws {BaseError} For other API errors
   */
  static async getDeveloperWithDetailsById(
    developerId: string,
  ): Promise<Developer> {
    if (!developerId?.trim()) {
      throw new InvalidFormatError("Developer ID is required");
    }

    const response = await this.makeAuthenticatedRequest<Developer>(
      `${this.API_URL}/${developerId}/with-details`,
    );

    if (!response.success || !response.data) {
      throw new Error(
        response.message || "Failed to retrieve developer details",
      );
    }

    return response.data;
  }
}
