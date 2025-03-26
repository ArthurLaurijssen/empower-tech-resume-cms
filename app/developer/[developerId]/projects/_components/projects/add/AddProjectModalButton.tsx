/**
 * Add Project Modal Button Component
 *
 * Provides an interactive button that opens a modal for adding new projects
 * to a specific skill within a developer's profile. Handles form submission,
 * validation, and user feedback in a seamless, user-friendly manner.
 */
"use client";

import { AddProjectButtonProps } from "@/app/developer/[developerId]/projects/_components/projects/add/types";
import { PlusIcon } from "@/components/icons/plus-icon/PlusIcon";
import React from "react";
import { projectFormSchema } from "@/lib/actions/project/types";
import { createProjectAction } from "@/lib/actions/project/create/createProject.server";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { Button } from "@/components/ui/buttons/button/button";
import { Modal } from "@/components/ui/modal/Modal";
import { SingleImageUpload } from "@/components/ui/forms/single-image-upload/SingleImageUpload";
import { UncontrolledTextAreaInput } from "@/components/ui/forms/text-area/UncontrolledTextAreaInput";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useModal } from "@/hooks/useModel";
import { transformProjectFormData } from "@/lib/utils/form-utils/projectFormUtils";

export const AddProjectModalButton: React.FC<AddProjectButtonProps> = ({
  skillId,
  developerId,
}) => {
  // Custom hook to manage modal visibility and interactions
  const modal = useModal();

  // Custom hook to handle form submission logic with built-in validation
  const form = useFormSubmission({
    // Validation schema for project form
    schema: projectFormSchema,
    // Transform form data before submission (e.g., formatting)
    transformData: transformProjectFormData,
    // Create project action with developer and skill context
    onSubmit: (data) => createProjectAction(developerId, skillId, data),
    // Close modal after successful submission
    onSuccess: modal.close,
    // User-friendly success and error messages
    successMessage: "Project added successfully",
    errorMessage: "Failed to add project",
  });

  return (
    <>
      {/* Trigger button to open project addition modal */}
      <button
        className="flex text-lime-600 hover:text-lime-500"
        onClick={modal.open}
      >
        <PlusIcon size={24} className="mx-auto me-2" />
        <span className="text-l text-semibold">Add Projects</span>
      </button>

      {/* Modal containing project creation form */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Add Project"
        subtitle="Fill in the form below to add a new project to your profile."
      >
        <form onSubmit={form.handleSubmit}>
          {/* Project title input */}
          <UncontrolledInputField
            className="mt-5"
            id="title"
            label="Project title:"
            type="text"
          />

          {/* Project description textarea */}
          <UncontrolledTextAreaInput
            className="mt-3"
            id="description"
            label="Project description:"
          />

          {/* Project image upload with dynamic directory */}
          <SingleImageUpload
            directory={`developers/${developerId}/skills/${skillId}/projects/temp/`}
            label="Project Image: "
            className="mt-3"
          />

          {/* Form validation error display */}
          <FormValidationError className="mt-2" errors={form.errors} />

          {/* Submit button with dynamic text based on submission state */}
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
