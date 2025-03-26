import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";
import { BaseError } from "@/lib/types/errors/BaseError";

/**
 * Error class for invalid response errors.
 * Extends the BaseError class with specific properties for invalid response scenarios.
 */
export class InvalidResponseError extends BaseError {
  /**
   * Creates a new InvalidResponseError instance.
   * @param details - Additional details about the invalid response error
   */
  constructor(details: string) {
    super("Invalid Response Error", 0, ErrorCode.INVALID_RESPONSE, details);
    this.name = "InvalidResponseError";
  }
}
