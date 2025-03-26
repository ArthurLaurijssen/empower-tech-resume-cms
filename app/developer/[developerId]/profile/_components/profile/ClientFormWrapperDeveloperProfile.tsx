/**
 * ClientFormWrapperDeveloperProfile - A form wrapper component for developer profile updates
 * Handles form submission, validation, and provides a consistent update experience
 */
"use client";

import { ClientFormWrapperDeveloperProfileProps } from "@/app/developer/[developerId]/profile/_components/profile/types";
import React from "react";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { updateDeveloperProfileAction } from "@/lib/actions/developer/update/updateDeveloperProfile.server.server";
import { developerProfileFormSchema } from "@/lib/actions/developer/types";
import { Button } from "@/components/ui/buttons/button/button";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { transformDeveloperProfileFormData } from "@/lib/utils/form-utils/developerProfileFormUtils";

export const ClientFormWrapperDeveloperProfile: React.FC<
  ClientFormWrapperDeveloperProfileProps
> = ({ children, developer }: ClientFormWrapperDeveloperProfileProps) => {
  // Custom hook to manage form submission logic with built-in validation and error handling
  const form = useFormSubmission({
    // Validation schema for the developer profile form
    schema: developerProfileFormSchema,

    // Transform form data before submission (e.g., formatting, cleaning)
    transformData: transformDeveloperProfileFormData,

    // Submit action with the specific developer's ID
    onSubmit: (data) => updateDeveloperProfileAction(developer.id, data),

    // Success and error messages for user feedback
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {/* Render child components (form fields) */}
      {children}

      {/* Display any validation errors */}
      <FormValidationError errors={form.errors} />

      {/* Submit button with dynamic text and disabled state */}
      <div className="relative w-full">
        <div className="mt-6 absolute right-0">
          <Button
            intent="primary"
            type="submit"
            customClassNames="me-4"
            // Disable button during submission to prevent multiple submissions
            disabled={form.isSubmitting || form.isPending}
          >
            {/* Change button text based on submission state */}
            {form.isSubmitting || form.isPending
              ? "Updating Profile..."
              : "Update Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
};
