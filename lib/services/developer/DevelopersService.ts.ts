import { Developer } from "@/models/entities/Developer";
import { AuthenticatedApiService } from "@/lib/services/api/AuthenticatedApiService";

/**
 * Service class for retrieving data related to multiple developers.
 */
export class DevelopersServiceTs extends AuthenticatedApiService {
  /**
   * The base URL for developers-related API endpoints.
   */
  private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5170"}/api/Developers`;

  /**
   * Retrieves all developers from the API.
   *
   * @returns A promise resolving to an array of Developer objects.
   */
  static async getAllDevelopers(): Promise<Developer[]> {
    const { data, success, message } = await this.makeAuthenticatedRequest<
      Developer[]
    >(this.API_URL);
    if (!success) {
      throw new Error(`Failed to retrieve developers: ${message}`);
    }
    return data;
  }

  /**
   * Retrieves all developers with their complete details from the API.
   *
   * @returns A promise resolving to an array of Developer objects with full details.
   */
  static async getAllDevelopersWithDetails(): Promise<Developer[]> {
    const { data, success, message } = await this.makeAuthenticatedRequest<
      Developer[]
    >(`${this.API_URL}/with-details`);
    if (!success) {
      throw new Error(`Failed to retrieve developers: ${message}`);
    }
    return data;
  }
}
