import { ErrorCode } from "@/lib/types/api/ErrorResponseDto";
import { BaseError } from "@/lib/types/errors/BaseError";

/**
 * Error class for JSON parsing errors.
 * Extends the BaseError class with specific properties for JSON parsing failure scenarios.
 */
export class JsonParseError extends BaseError {
  /**
   * Creates a new JsonParseError instance.
   * @param details - Additional details about the JSON parsing error
   */
  constructor(details: string) {
    super("JSON Parse Error", 0, ErrorCode.LOCAL_JSON_PARSE_ERROR, details);
    this.name = "JsonParseError";
  }
}
