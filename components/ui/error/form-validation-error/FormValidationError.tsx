/**
 * Form Validation Error Message Component
 *
 * A React component that displays form validation errors in a structured, accessible format.
 * Features:
 * - Conditional rendering based on error presence
 * - Plural/singular error message handling
 * - Accessible error list structure
 * - Visual error indication with icon
 * - Consistent error styling
 *
 * @module FormValidationErrorMessage
 */

import { FormValidationErrorMessagesProps } from "@/components/ui/error/form-validation-error/types";
import React from "react";

/**
 * FormValidationError Component
 *
 * Displays a list of form validation errors with appropriate styling and accessibility features.
 * Returns null if no errors are present.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array<{path: string[], message: string}>} props.errors - Array of error objects
 *        Each error object contains:
 *        - path: Array of strings representing the path to the field with error
 *        - message: Error message string
 *
 * @example
 * // Single error
 * <FormValidationError
 *   errors={[
 *     { path: ['email'], message: 'Email is required' }
 *   ]}
 * />
 *
 * @example
 * // Multiple errors
 * <FormValidationError
 *   errors={[
 *     { path: ['email'], message: 'Email is required' },
 *     { path: ['password'], message: 'Password must be at least 8 characters' }
 *   ]}
 * />
 */
export const FormValidationError: React.FC<
  FormValidationErrorMessagesProps
> = ({ errors, className }: FormValidationErrorMessagesProps) => {
  // Return null if no errors present
  if (errors.length === 0) {
    return null;
  }

  const Wrapper = className ? "div" : React.Fragment;

  return (
    // Main error container with error styling
    <Wrapper {...(className && { className })}>
      <div className="rounded-md bg-red-50 p-4 mb-6">
        <div className="flex">
          {/* Error icon */}
          <div className="shrink-0">
            <svg
              className="size-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Error content container */}
          <div className="ml-3">
            {/* Dynamic error heading with proper pluralization */}
            <h3 className="text-sm font-medium text-red-800">
              There {errors.length === 1 ? "was" : "were"} {errors.length} error
              {errors.length === 1 ? "" : "s"} with your submission
            </h3>
            {/* Error list container */}
            <div className="mt-2 text-sm text-red-700">
              {/* Accessible error list with proper role */}
              <ul role="list" className="list-disc space-y-1 pl-5">
                {errors.map((error, index) => (
                  <li key={`${error.path.join("-")}-${index}`}>
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
