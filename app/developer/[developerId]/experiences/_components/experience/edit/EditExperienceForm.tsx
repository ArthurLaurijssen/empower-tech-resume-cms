"use client";

import React from "react";
import { Button } from "@/components/ui/buttons/button/button";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { EditExperienceFormProps } from "@/app/developer/[developerId]/experiences/_components/experience/edit/types";
import {
  experienceFormSchema,
  experienceTypeOptions,
} from "@/lib/actions/experience/types";
import { updateExperienceAction } from "@/lib/actions/experience/update/updateExperience.server";
import { UncontrolledSelectInput } from "@/components/ui/forms/select/UncontrolledSelectInput";
import { UncontrolledTextAreaInput } from "@/components/ui/forms/text-area/UncontrolledTextAreaInput";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { transformExperienceFormData } from "@/lib/utils/form-utils/experienceFormUtils";

/**
 * EditExperienceForm provides a form interface for editing existing experience entries.
 * The component uses uncontrolled form inputs for better performance and the useFormSubmission
 * hook to handle form state, validation, and submission logic.
 *
 * @param experience - The existing experience data to populate the form
 * @param developerId - The ID of the developer who owns this experience
 * @param onCancel - Callback function to handle cancellation of the edit operation
 */
export const EditExperienceForm: React.FC<EditExperienceFormProps> = ({
  experience,
  developerId,
  onCancel,
}) => {
  // Initialize form handling with useFormSubmission hook
  // This manages form state, validation, submission, and success/error handling
  const form = useFormSubmission({
    // Validate form data against our schema
    schema: experienceFormSchema,
    // Transform raw form data into the format expected by our API
    transformData: transformExperienceFormData,
    // Update action that receives both the developer ID and experience ID
    onSubmit: (data) =>
      updateExperienceAction(developerId, experience.id, data),
    // Close the edit form on successful update
    onSuccess: onCancel,
    successMessage: "Experience updated successfully",
    errorMessage: "Failed to update experience",
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {/* Experience type dropdown populated with predefined options */}
      <UncontrolledSelectInput
        className="mt-5"
        id="experienceType"
        label="Experience Type:"
        options={experienceTypeOptions}
        defaultValue={experience.experienceType.toString()}
      />

      {/* Date inputs for experience duration
         Split T from ISO string to get just the date portion */}
      <UncontrolledInputField
        className="mt-3"
        id="startDate"
        label="Start Date:"
        type="date"
        defaultValue={experience.startDate.split("T")[0]}
      />
      <UncontrolledInputField
        className="mt-3"
        id="endDate"
        label="End Date:"
        type="date"
        defaultValue={experience.endDate?.split("T")[0]}
      />

      {/* Basic information fields pre-populated with existing data */}
      <UncontrolledInputField
        className="mt-3"
        id="locationName"
        label="Location Name:"
        type="text"
        defaultValue={experience.locationName}
      />
      <UncontrolledInputField
        className="mt-3"
        id="title"
        label="Title:"
        type="text"
        defaultValue={experience.title}
      />

      {/* Larger text area for detailed experience description */}
      <UncontrolledTextAreaInput
        className="mt-3"
        id="description"
        label="Description:"
        defaultValue={experience.description}
      />

      {/* Display any validation errors from form submission */}
      <FormValidationError className="mt-2" errors={form.errors} />

      {/* Form action buttons with dynamic submit button text */}
      <div className="flex mt-4">
        <Button
          intent="primary"
          type="submit"
          customClassNames="me-4"
          disabled={form.isSubmitting || form.isPending}
        >
          {form.isSubmitting || form.isPending
            ? "Updating Experience..."
            : "Update Experience"}
        </Button>
        <Button intent="white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
