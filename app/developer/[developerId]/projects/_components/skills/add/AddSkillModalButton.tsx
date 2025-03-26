/**
 * AddSkillModalButton Component
 *
 * Provides an interactive button to add new skills with a modal form
 * Handles skill creation with comprehensive form validation and user feedback
 */
"use client";

import React from "react";
import { Modal } from "@/components/ui/modal/Modal";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { addSkillAction } from "@/lib/actions/skill/create/createSkill.server";
import { Button } from "@/components/ui/buttons/button/button";
import { AddSkillButtonProps } from "@/app/developer/[developerId]/projects/_components/skills/add/types";
import { skillFormSchema } from "@/lib/actions/skill/types";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useModal } from "@/hooks/useModel";
import { transformSkillFormData } from "@/lib/utils/form-utils/skillFormUtils";

export const AddSkillModalButton: React.FC<AddSkillButtonProps> = ({
  developerId,
}) => {
  // Modal state management hook
  const modal = useModal();

  // Form submission logic with validation and error handling
  const form = useFormSubmission({
    schema: skillFormSchema,
    transformData: transformSkillFormData,
    // Create skill action with developer context
    onSubmit: (data) => addSkillAction(developerId, data),
    // Close modal on successful submission
    onSuccess: modal.close,
    successMessage: "Skill added successfully",
    errorMessage: "Failed to add skill",
  });

  return (
    <>
      {/* Trigger button for opening skill add modal */}
      <Button intent="primary" onClick={modal.open} type="button">
        {form.isSubmitting || form.isPending ? "Adding Skill..." : "Add Skill"}
      </Button>

      {/* Modal for skill creation form */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Add Skill"
        subtitle="Fill in the form below to add a new skill to your profile."
      >
        <form onSubmit={form.handleSubmit}>
          {/* Skill name input */}
          <UncontrolledInputField
            className="mt-5"
            id="name"
            label="Technology name:"
            type="text"
          />

          {/* Proficiency level input */}
          <UncontrolledInputField
            className="mt-3"
            id="proficiencyLevel"
            label="Proficiency level:"
            type="number"
          />

          {/* Display any validation errors */}
          <FormValidationError className="mt-2" errors={form.errors} />

          {/* Submit button with dynamic text and disabled state */}
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
