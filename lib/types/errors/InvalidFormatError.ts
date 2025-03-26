import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";
import { BaseError } from "@/lib/types/errors/BaseError";

/**
 * Error class for invalid format errors.
 * Extends the BaseError class with specific properties for invalid format scenarios.
 */
export class InvalidFormatError extends BaseError {
  /**
   * Creates a new InvalidFormatError instance.
   * @param details - Additional details about the invalid format error
   */
  constructor(details: string) {
    super("Invalid Format Error", 0, ErrorCode.INVALID_FORMAT, details);
    this.name = "InvalidFormatError";
  }
}
