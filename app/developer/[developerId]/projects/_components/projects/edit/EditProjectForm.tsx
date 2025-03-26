/**
 * EditProjectForm Component
 *
 * A sophisticated form for editing existing projects within a developer's portfolio
 * Provides a seamless, user-friendly interface for project modification
 */
"use client";
import React from "react";
import { Button } from "@/components/ui/buttons/button/button";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { UncontrolledTextAreaInput } from "@/components/ui/forms/text-area/UncontrolledTextAreaInput";
import { SingleImageUpload } from "@/components/ui/forms/single-image-upload/SingleImageUpload";
import { EditProjectFormProps } from "@/app/developer/[developerId]/projects/_components/projects/edit/types";
import { projectFormSchema } from "@/lib/actions/project/types";
import { updateProjectAction } from "@/lib/actions/project/update/updateProject.server";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { transformProjectFormData } from "@/lib/utils/form-utils/projectFormUtils";

export const EditProjectForm: React.FC<EditProjectFormProps> = ({
  project,
  skillId,
  developerId,
  onCancel,
}) => {
  // Reusable form submission hook with consistent behavior across create/edit
  const form = useFormSubmission({
    // Validation schema ensures data integrity
    schema: projectFormSchema,

    // Consistent data transformation for both add and edit scenarios
    transformData: transformProjectFormData,

    // Update action with comprehensive project context
    onSubmit: (data) =>
      updateProjectAction(developerId, skillId, project.id, data),

    // Close edit form on successful update
    onSuccess: onCancel,

    // User-friendly feedback messages
    successMessage: "Project updated successfully",
    errorMessage: "Failed to update project",
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {/* Project title input with default value from existing project */}
      <UncontrolledInputField
        className="mt-5"
        id="title"
        label="Project title:"
        type="text"
        defaultValue={project.title}
      />

      {/* Project description textarea with existing description */}
      <UncontrolledTextAreaInput
        className="mt-3"
        id="description"
        label="Project description:"
        defaultValue={project.description}
      />

      {/* Image upload with dynamically generated directory */}
      <SingleImageUpload
        directory={`developers/${developerId}/skills/${skillId}/projects/${project.id}/`}
        label="Project Image: "
        className="mt-3"
      />

      {/* Display any validation errors */}
      <FormValidationError className="mt-2" errors={form.errors} />

      {/* Action buttons for form submission and cancellation */}
      <div className="flex mt-4">
        <Button
          intent="primary"
          type="submit"
          customClassNames="me-4"
          disabled={form.isSubmitting || form.isPending}
        >
          {form.isSubmitting || form.isPending
            ? "Updating Project..."
            : "Update Project"}
        </Button>
        <Button intent="white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
