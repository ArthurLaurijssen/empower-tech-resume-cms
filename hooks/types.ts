/**
 * @fileoverview Core configuration interfaces for React hooks
 * This file defines the configuration and return type interfaces for a suite of React hooks
 * that handle common UI patterns like form validation, submissions, deletions, and modals.
 */

import { ZodIssue, ZodSchema } from "zod";

/**
 * Return type interface for the useZodValidation hook
 * Provides validation errors and a function to validate data against a schema
 *
 * @template T - The type of data being validated
 */
export interface UseZodValidationReturn<T> {
  /** Array of validation issues found during schema validation */
  errors: ZodIssue[];

  /**
   * Function to validate data against the schema
   * @param data - The data to validate
   * @returns boolean indicating if validation passed
   */
  validateData: (data: T) => boolean;
}

/**
 * Configuration interface for the useFormSubmission hook
 * Defines the complete setup for handling form submissions including validation,
 * data transformation, submission handling, and success/error messaging
 *
 * @template T - The type of data being submitted
 */
export interface UseFormSubmissionConfig<T> {
  /** Zod schema for validating form data */
  schema: ZodSchema;

  /**
   * Function to transform raw FormData into the expected data type
   * @param formData - Raw form data from the form submission event
   * @returns Transformed data of type T
   */
  transformData: (formData: FormData) => T;

  /**
   * Function that handles the actual form submission
   * @param data - Transformed and validated form data
   * @returns Promise resolving to a success status and optional message
   */
  onSubmit: (data: T) => Promise<{ success: boolean; message?: string }>;

  /** Optional callback function to execute after successful submission */
  onSuccess?: () => void;

  /** Custom success message to display after successful submission */
  successMessage?: string;

  /** Custom error message to display if submission fails */
  errorMessage?: string;
}

/**
 * Configuration interface for the useDelete hook
 * Provides a complete setup for handling deletion operations including
 * confirmation, success/error handling, and messaging
 */
export interface UseDeleteConfig {
  /**
   * Function that performs the actual deletion operation
   * @returns Promise resolving to a success status and optional message
   */
  onDelete: () => Promise<{ success: boolean; message?: string }>;

  /** Optional callback function to execute after successful deletion */
  onSuccess?: () => void;

  /** Title text for the confirmation modal */
  confirmTitle?: string;

  /** Description text for the confirmation modal */
  confirmDescription?: string;

  /** Message to display after successful deletion */
  successMessage?: string;

  /** Message to display if deletion fails */
  errorMessage?: string;
}

/**
 * Configuration interface for the useModal hook
 * Defines the setup and lifecycle callbacks for a modal dialog
 */
export interface UseModalConfig {
  /**
   * Initial visibility state of the modal
   * @default false
   */
  initialState?: boolean;

  /**
   * Callback executed when the modal opens
   * Useful for initialization or analytics
   */
  onOpen?: () => void;

  /**
   * Callback executed when the modal closes
   * Can be used for cleanup or state reset
   */
  onClose?: () => void;

  /**
   * Callback executed when the modal visibility toggles
   * Receives the new visibility state
   */
  onToggle?: () => void;
}
