import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useZodValidation } from "@/hooks/useZodValidation";
import { UseFormSubmissionConfig } from "@/hooks/types";

/**
 * Custom hook for handling form submissions with validation and state management.
 * @template T The type of the form data
 */
export function useFormSubmission<T>({
  schema,
  transformData,
  onSubmit,
  onSuccess,
  successMessage = "Operation completed successfully",
  errorMessage = "Operation failed",
}: UseFormSubmissionConfig<T>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const { errors, validateData } = useZodValidation(schema);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission, including data transformation, validation, and submission.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const data = transformData(formData);

      if (validateData(data)) {
        startTransition(async () => {
          const result = await onSubmit(data);
          if (result.success) {
            showToast(result.message || successMessage, "success");
            router.refresh();
            onSuccess?.();
          } else {
            showToast(result.message || errorMessage, "error");
          }
        });
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "An unexpected error occurred",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isPending, // Indicates if a transition is pending
    isSubmitting, // Indicates if the form is currently being submitted
    errors, // Validation errors from Zod
    handleSubmit, // Function to handle form submission
  };
}
