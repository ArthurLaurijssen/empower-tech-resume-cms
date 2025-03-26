/**
 * AddSocialMediaLinkModalButton Component
 *
 * Provides an interactive button to add new social media links
 * with a modal form and comprehensive validation
 */
"use client";

import { PlusIcon } from "@/components/icons/plus-icon/PlusIcon";
import React from "react";
import { FormValidationError } from "@/components/ui/error/form-validation-error/FormValidationError";
import { Button } from "@/components/ui/buttons/button/button";
import { Modal } from "@/components/ui/modal/Modal";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";
import { UncontrolledSelectInput } from "@/components/ui/forms/select/UncontrolledSelectInput";
import {
  socialMediaLinkFormSchema,
  SocialMediaNetworkOptions,
} from "@/lib/actions/social-media-link/types";
import { createSocialMediaLinkAction } from "@/lib/actions/social-media-link/create/createSocialMediaLink.server";
import { AddSocialMediaLinkModalButtonProps } from "@/app/developer/[developerId]/social-media-links/_components/social-media/add/types";
import { useModal } from "@/hooks/useModel";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { transformSocialMediaFormData } from "@/lib/utils/form-utils/socialMediaFormUtils";

export const AddSocialMediaLinkModalButton: React.FC<
  AddSocialMediaLinkModalButtonProps
> = ({ developerId }: AddSocialMediaLinkModalButtonProps) => {
  // Modal state management hook
  const modal = useModal();

  // Form submission logic with validation and error handling
  const form = useFormSubmission({
    schema: socialMediaLinkFormSchema,
    transformData: transformSocialMediaFormData,
    // Create social media link action with developer context
    onSubmit: (data) => createSocialMediaLinkAction(developerId, data),
    // Close modal on successful submission
    onSuccess: modal.close,
    successMessage: "Social media link added successfully",
    errorMessage: "Failed to add social media link",
  });

  return (
    <>
      {/* Button to open social media link modal */}
      <Button intent="primary" onClick={modal.open}>
        <div className="flex items-center">
          <PlusIcon className="me-2" />
          <span>Add Social Media Link</span>
        </div>
      </Button>

      {/* Modal for adding social media link */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Add Social Media Link"
        subtitle="Fill in the form below to add a new social media link to your profile."
      >
        <form onSubmit={form.handleSubmit}>
          {/* Social media network selection */}
          <UncontrolledSelectInput
            className="mt-5"
            id="network"
            label="Social Media Network:"
            options={SocialMediaNetworkOptions}
          />

          {/* Social media profile URL input */}
          <UncontrolledInputField
            className="mt-3"
            id="socialMediaUrl"
            type="text"
            label="Profile URL:"
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
