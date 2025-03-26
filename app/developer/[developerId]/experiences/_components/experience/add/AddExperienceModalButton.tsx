"use client";

import { AddExperienceButtonProps } from "@/app/developer/[developerId]/experiences/_components/experience/add/types";
import { PlusIcon } from "@/components/icons/plus-icon/PlusIcon";
import React from "react";
import {
  experienceFormSchema,
  experienceTypeOptions,
} from "@/lib/actions/experience/types";
import { createExperienceAction } from "@/lib/actions/experience/create/createExperience.server";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { Button } from "@/components/ui/buttons/button/button";
import { Modal } from "@/components/ui/modal/Modal";
import { UncontrolledTextAreaInput } from "@/components/ui/forms/text-area/UncontrolledTextAreaInput";
import { UncontrolledSelectInput } from "@/components/ui/forms/select/UncontrolledSelectInput";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useModal } from "@/hooks/useModel";
import { transformExperienceFormData } from "@/lib/utils/form-utils/experienceFormUtils";

/**
 * A modal button component that handles the creation of new experiences for developers.
 * Combines form handling, validation, and modal management into a reusable component.
 */
export const AddExperienceModalButton: React.FC<AddExperienceButtonProps> = ({
  developerId,
}) => {
  /**
   * Manages modal state (open/close) and related behaviors
   * Encapsulates all modal-specific logic in a custom hook
   */
  const modal = useModal();

  /**
   * Handles form submission logic including validation, data transformation, and API calls
   * Uses a schema for type-safe validation and provides submission state management
   */
  const form = useFormSubmission({
    schema: experienceFormSchema,
    transformData: transformExperienceFormData,
    onSubmit: (data) => createExperienceAction(developerId, data),
    onSuccess: modal.close,
    successMessage: "Experience added successfully",
    errorMessage: "Failed to add experience",
  });

  return (
    <>
      {/* Primary button that triggers the modal */}
      <Button intent="primary" onClick={modal.open}>
        <div className="flex items-center">
          <PlusIcon className="me-2" /> {/* Icon with right margin */}
          <span>Add Experience</span>
        </div>
      </Button>

      {/* Modal component containing the experience form */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Add Experience"
        subtitle="Fill in the form below to add a new experience to your profile."
      >
        {/* Form structure with uncontrolled inputs for better performance */}
        <form onSubmit={form.handleSubmit}>
          {/* Experience type selection dropdown */}
          <UncontrolledSelectInput
            className="mt-5" // Top margin for spacing
            id="experienceType"
            label="Experience Type:"
            options={experienceTypeOptions}
          />

          {/* Date inputs for experience timeline */}
          <UncontrolledInputField
            className="mt-3"
            id="startDate"
            label="Start Date:"
            type="date"
          />
          <UncontrolledInputField
            className="mt-3"
            id="endDate"
            label="End Date:"
            type="date"
          />

          {/* Text inputs for experience details */}
          <UncontrolledInputField
            className="mt-3"
            id="locationName"
            label="Location Name:"
            type="text"
          />
          <UncontrolledInputField
            className="mt-3"
            id="title"
            label="Title:"
            type="text"
          />

          {/* Textarea for detailed description */}
          <UncontrolledTextAreaInput
            className="mt-3"
            id="description"
            label="Description:"
          />

          {/* Error display and submission button */}
          <FormValidationError className="mt-2" errors={form.errors} />
          <Button
            type="submit"
            customClassNames="mt-4"
            disabled={form.isSubmitting || form.isPending}
            intent="primary"
          >
            {form.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};
