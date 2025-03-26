/**
 * Zod Validation Hook
 *
 * A custom React hook that provides Zod schema validation functionality
 * with error state management. Useful for form validation and data
 * structure validation in React components.
 *
 * @module useZodValidation
 */

import { ZodIssue, ZodSchema } from "zod";
import { UseZodValidationReturn } from "@/hooks/types";
import { useState } from "react";

/**
 * useZodValidation Hook
 *
 * Provides schema validation functionality using Zod with integrated error state management.
 *
 * @template T - The type of data being validated
 * @param {ZodSchema<T>} schema - Zod schema to validate against
 * @returns {Object} Validation utilities
 * @returns {ZodIssue[]} returns.errors - Array of current validation errors
 * @returns {function} returns.validateData - Function to validate data against schema
 *
 * @example
 * // Define a schema
 * const userSchema = z.object({
 *   name: z.string().min(2),
 *   email: z.string().email()
 * });
 *
 * // Use the hook
 * function UserForm() {
 *   const { errors, validateData } = useZodValidation(userSchema);
 *
 *   const handleSubmit = (data) => {
 *     if (validateData(data)) {
 *       // Data is valid, proceed
 *     }
 *   };
 * }
 *
 * @example
 * // Handling validation errors
 * function Form() {
 *   const { errors, validateData } = useZodValidation(schema);
 *
 *   return (
 *     <div>
 *       {errors.map(error => (
 *         <p key={error.path.join('.')}>{error.message}</p>
 *       ))}
 *     </div>
 *   );
 * }
 */
export function useZodValidation<T>(
  schema: ZodSchema<T>,
): UseZodValidationReturn<T> {
  // State for validation errors
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  /**
   * Validates data against the provided schema
   *
   * @returns {boolean} True if validation passes, false otherwise
   */
  const validateData = (data: T): boolean => {
    // Perform safe parsing to handle validation errors
    const result = schema.safeParse(data);

    if (!result.success) {
      // Update error state with validation issues
      setErrors(result.error.issues);
      return false;
    }

    // Clear errors and return success
    setErrors([]);
    return true;
  };

  return { errors, validateData };
}
