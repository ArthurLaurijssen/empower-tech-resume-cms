import { ErrorCode, ErrorResponseDto } from "@/lib/types/api/ErrorResponseDto";
import { JsonParseError } from "@/lib/types/errors/JsonParseError";
import { NetworkError } from "@/lib/types/errors/NetworkError";
import { BaseError } from "@/lib/types/errors/BaseError";
import { InvalidResponseError } from "@/lib/types/errors/InvalidResponseError";
import { ApiResponse } from "@/lib/types/api/ApiResponse";

export abstract class BaseApiService {
  /** Default headers for API requests */
  protected static readonly DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  /**
   * Makes an HTTP request to the specified URL.
   * @param url The URL to send the request to
   * @param options Request options
   * @returns A Promise resolving to the API response
   */
  protected static async makeRequest<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.DEFAULT_HEADERS,
        ...options.headers,
      },
      cache: "no-store",
    };

    let response: Response;
    try {
      response = await fetch(url, requestOptions);
    } catch (error) {
      throw new NetworkError((error as Error)?.message ?? String(error));
    }

    // Handle error responses
    if (!response.ok) {
      console.log("Response not ok", response);
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        try {
          const errorData = await response.json();
          console.log(
            "Raw error data received:",
            JSON.stringify(errorData, null, 2),
          );
          console.log("Properties present:", Object.keys(errorData));

          if (this.isErrorResponse(errorData)) {
            throw new BaseError(
              errorData.error,
              errorData.statusCode,
              errorData.code,
              errorData.details,
              errorData.id,
            );
          } else {
            console.log(
              "Failed isErrorResponse check. Expected properties:",
              ["StatusCode", "Error", "Code", "Details"].filter(
                (prop) => !(prop in errorData),
              ),
            );
            throw new InvalidResponseError(
              "Server returned JSON but not a valid ErrorResponse",
            );
          }
        } catch (error) {
          if (error instanceof BaseError) {
            throw error;
          }
          throw new JsonParseError(
            `Failed to parse error response: ${(error as Error)?.message}`,
          );
        }
      }
      console.log(await response.json());

      throw new InvalidResponseError(
        `Expected JSON response but got ${contentType || "unknown content type"}`,
      );
    }

    // Parse successful response
    try {
      const rawText = await response.text();
      return rawText ? JSON.parse(rawText) : null;
    } catch (error) {
      throw new JsonParseError(
        `Failed to parse success response: ${(error as Error)?.message}`,
      );
    }
  }

  /**
   * Checks if the given object is a valid ErrorResponseDto.
   * @param obj The object to check
   * @returns True if the object is a valid ErrorResponseDto, false otherwise
   */
  private static isErrorResponse(obj: unknown): obj is ErrorResponseDto {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "statusCode" in obj &&
      "error" in obj &&
      "code" in obj &&
      "details" in obj &&
      typeof obj.code === "string" &&
      Object.values(ErrorCode).includes(obj.code as ErrorCode)
    );
  }
}
