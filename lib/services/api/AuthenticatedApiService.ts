import { BaseApiService } from "@/lib/services/api/BaseApiService";
import { ApiResponse } from "@/lib/types/api/ApiResponse";
import { auth0 } from "@/lib/auth0";
import { NoTokenError } from "@/lib/types/errors/NoTokenError";

export abstract class AuthenticatedApiService extends BaseApiService {
  /**
   * Makes an authenticated request, automatically handling token retrieval and injection.
   *
   * @template T The type of the returned data
   * @param url The URL to make the request to
   * @param options Optional request options
   * @returns Promise resolving to ApiResponse<T>
   */
  protected static async makeAuthenticatedRequest<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const tokenResponse = await auth0.getAccessToken();

    if (!tokenResponse?.token) {
      throw new NoTokenError("No authentication token available");
    }

    // Merge the authorization header with existing headers
    const authenticatedOptions: RequestInit = {
      ...options,
      headers: {
        ...this.DEFAULT_HEADERS,
        ...options.headers,
        Authorization: `Bearer ${tokenResponse.token}`,
      },
    };

    return this.makeRequest<T>(url, authenticatedOptions);
  }
}
