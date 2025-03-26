import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";
import { BaseError } from "@/lib/types/errors/BaseError";

/**
 * Error class for scenarios where no authentication token is available.
 * Extends the BaseError class with specific properties for missing token scenarios.
 */
export class NoTokenError extends BaseError {
  /**
   * Creates a new NoTokenError instance.
   * @param details - Additional details about the missing token error
   */
  constructor(details: string) {
    super(
      "No authentication token available",
      0,
      ErrorCode.NO_TOKEN_FOUND,
      details,
    );
    this.name = "NoTokenError";
  }
}
