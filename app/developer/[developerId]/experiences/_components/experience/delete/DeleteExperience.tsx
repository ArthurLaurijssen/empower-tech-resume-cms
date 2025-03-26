"use client";

import React from "react";
import { DeleteModalConfirm } from "@/components/ui/modal/delete-modal-confirm/DeleteModalConfirm";
import { DeleteIcon } from "@/components/icons/delete-icon/DeleteIcon";
import { DeleteExperienceProps } from "@/app/developer/[developerId]/experiences/_components/experience/delete/types";
import { deleteExperienceAction } from "@/lib/actions/experience/delete/deleteExperience.server";
import { useDelete } from "@/hooks/useDelete";

/**
 * DeleteExperience provides a delete functionality for experience entries with a confirmation modal.
 * The component uses the useDelete hook to manage the deletion flow, including state management
 * and user confirmation handling.
 *
 * @param experience - The experience entry to be deleted, containing id and title
 * @param developerId - The ID of the developer who owns this experience
 * @param className - Optional CSS classes for styling the delete icon container
 * @param size - The size of the delete icon in pixels, defaults to 16
 */
export const DeleteExperience: React.FC<DeleteExperienceProps> = ({
  experience,
  developerId,
  className,
  size = 16,
}: DeleteExperienceProps) => {
  // Initialize the delete operation hook with configuration for this specific experience
  // This centralizes all deletion-related state and logic in one place
  const deleteOperation = useDelete({
    // Server action to execute when deletion is confirmed
    onDelete: () => deleteExperienceAction(developerId, experience.id),
    // Customized messages for the confirmation modal
    confirmTitle: "Delete experience?",
    confirmDescription: `Are you sure you want to delete ${experience.title}? This action cannot be undone.`,
    // Feedback messages for the operation result
    successMessage: "Experience deleted successfully",
    errorMessage: "Failed to delete experience",
  });

  // Determine whether to wrap the delete icon in a div (for styling) or use a Fragment
  // This prevents unnecessary DOM nesting when no className is provided
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Delete icon that triggers the confirmation modal */}
      <DeleteIcon onClick={deleteOperation.openConfirmModal} size={size} />

      {/* Confirmation modal with dynamic content from deleteOperation */}
      <DeleteModalConfirm
        isOpen={deleteOperation.isOpen}
        onClose={deleteOperation.closeConfirmModal}
        onConfirm={deleteOperation.handleDelete}
        title={deleteOperation.confirmTitle}
        description={deleteOperation.confirmDescription}
        isLoading={deleteOperation.isPending}
      />
    </Wrapper>
  );
};
