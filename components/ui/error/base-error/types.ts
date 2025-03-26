/**
 * Properties for Base Error Handler Component
 *
 * Defines the context and information required to display a standardized error
 */
import { BaseError } from "@/lib/types/errors/BaseError";

export interface BaseErrorHandlerProps {
  /**
   * The error object containing detailed error information
   * Provides comprehensive context about the error that occurred
   */
  error: BaseError;

  /**
   * Custom title for the error page
   * Allows contextual messaging for different error scenarios
   */
  title: string;

  /**
   * Optional identifier for additional error context
   * Can be used to provide more specific tracking or reference
   */
  id?: string;
}
