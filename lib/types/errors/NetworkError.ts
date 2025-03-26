import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";
import { BaseError } from "@/lib/types/errors/BaseError";

/**
 * Error class for network-related errors.
 * Extends the BaseError class with specific properties for network failure scenarios.
 */
export class NetworkError extends BaseError {
  /**
   * Creates a new NetworkError instance.
   * @param details - Additional details about the network error
   */
  constructor(details: string) {
    super("Network Error", 500, ErrorCode.NETWORK_ERROR, details);
    this.name = "NetworkError";
  }
}
