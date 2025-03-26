import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";

/**
 * Base error class for custom application errors.
 * Extends the built-in Error class with additional properties.
 */
export class BaseError extends Error {
  /**
   * Creates a new BaseError instance.
   * @param message - The error message
   * @param statusCode - The HTTP status code associated with the error
   * @param code - The specific error code from the ErrorCode enum
   * @param details - Additional details about the error
   * @param id - An optional unique identifier for the error instance
   */
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code: ErrorCode,
    readonly details: string,
    readonly id?: string,
  ) {
    super(message);
    this.name = "BaseError";
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
