/**
 * Enum representing various error codes used in the application.
 */
export enum ErrorCode {
  // Authentication & Authorization
  /** Indicates a failure in token validation */
  TOKEN_VALIDATION_FAILED = "TOKEN_VALIDATION_FAILED",
  /** Indicates an unauthorized access attempt */
  UNAUTHORIZED = "UNAUTHORIZED",

  // Resource & Route Errors
  /** Indicates that the requested endpoint does not exist */
  ENDPOINT_NOT_FOUND = "ENDPOINT_NOT_FOUND",
  /** Indicates that the requested resource was not found */
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",

  // Validation & Format Errors
  /** Indicates an invalid format for an ID */
  INVALID_ID_FORMAT = "INVALID_ID_FORMAT",
  /** Indicates an invalid argument was provided */
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  /** Indicates a failure in model validation */
  VALIDATION_ERROR = "VALIDATION_ERROR",

  // Request Problems
  /** Indicates that the request payload is too large */
  PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
  /** Indicates an unsupported media type in the request */
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  /** Indicates that the rate limit has been exceeded */
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // CORS
  /** Indicates a CORS-related error */
  CORS_ERROR = "CORS_ERROR",

  // Server Errors
  /** Indicates an internal server error */
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",

  /** Indicates an invalid response from the server */
  INVALID_RESPONSE = "INVALID_RESPONSE",
  /** Indicates an error in parsing local JSON data */
  LOCAL_JSON_PARSE_ERROR = "LOCAL_JSON_PARSE_ERROR",
  /** Indicates a network-related error */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** Indicates that no token was found when one was expected */
  NO_TOKEN_FOUND = "NO_TOKEN_FOUND",
  /** Indicates an invalid format in the data */
  INVALID_FORMAT = "INVALID_FORMAT",
}

/**
 * Interface representing the structure of an error response.
 */
export interface ErrorResponseDto {
  /** The HTTP status code of the error */
  statusCode: number;
  /** A human-readable error message */
  error: string;
  /** The specific error code from the ErrorCode enum */
  code: ErrorCode;
  /** Additional details about the error */
  details: string;
  /** An optional unique identifier for the error instance */
  id?: string;
}
