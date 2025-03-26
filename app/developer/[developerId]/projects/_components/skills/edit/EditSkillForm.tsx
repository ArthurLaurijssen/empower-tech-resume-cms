/**
 * EditSkillForm Component
 *
 * Provides a form for editing an existing skill with validation
 * and user-friendly interaction patterns
 */
"use client";

import React from "react";
import { EditSkillFormProps } from "@/app/developer/[developerId]/projects/_components/skills/edit/types";
import { Button } from "@/components/ui/buttons/button/button";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { skillFormSchema } from "@/lib/actions/skill/types";
import { updateSkillAction } from "@/lib/actions/skill/update/updateSkill.server";
import { transformSkillFormData } from "@/lib/utils/form-utils/skillFormUtils";

export const EditSkillForm: React.FC<EditSkillFormProps> = ({
  skill,
  developerId,
  onCancel,
}: EditSkillFormProps) => {
  // Form submission hook manages validation and submission logic
  const form = useFormSubmission({
    schema: skillFormSchema,
    transformData: transformSkillFormData,
    // Update action with developer and skill context
    onSubmit: (data) => updateSkillAction(developerId, skill.id, data),
    // Close form on successful update
    onSuccess: onCancel,
    successMessage: "Skill updated successfully",
    errorMessage: "Failed to update skill",
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {/* Technology name input with existing value */}
      <UncontrolledInputField
        className="mt-5"
        id="name"
        label="Technology name:"
        type="text"
        defaultValue={skill.technologyName}
      />

      {/* Proficiency level input with existing value */}
      <UncontrolledInputField
        className="mt-3"
        id="proficiencyLevel"
        label="Proficiency level:"
        type="number"
        defaultValue={skill.proficiencyLevel}
      />

      {/* Display any validation errors */}
      <FormValidationError className="mt-2" errors={form.errors} />

      {/* Action buttons for submission and cancellation */}
      <div className="flex mt-4">
        <Button
          intent="primary"
          type="submit"
          customClassNames="me-4"
          disabled={form.isSubmitting || form.isPending}
        >
          {form.isSubmitting || form.isPending
            ? "Updating skill..."
            : "Update Skill"}
        </Button>
        <Button intent="white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
