/**
 * DeleteSocialMediaLink Component
 *
 * Provides a robust, user-friendly mechanism for deleting social media links
 * with comprehensive confirmation and error handling
 */
"use client";

import React from "react";
import { DeleteModalConfirm } from "@/components/ui/modal/delete-modal-confirm/DeleteModalConfirm";
import { DeleteIcon } from "@/components/icons/delete-icon/DeleteIcon";
import { deleteSocialMediaLinkAction } from "@/lib/actions/social-media-link/delete/deleteSocialMediaLink.server";
import { DeleteSocialMediaLinkProps } from "@/app/developer/[developerId]/social-media-links/_components/social-media/delete/types";
import { SocialMediaNetwork } from "@/models/enums/SocialMediaNetwork";
import { useDelete } from "@/hooks/useDelete";

export const DeleteSocialMediaLink: React.FC<DeleteSocialMediaLinkProps> = ({
  socialMediaLink,
  developerId,
  className,
  size = 16,
}) => {
  // Convert network enum to human-readable name
  const networkName = SocialMediaNetwork[socialMediaLink.network];

  // Custom hook manages deletion logic and state
  const deleteOperation = useDelete({
    // Server action to delete specific social media link
    onDelete: () => deleteSocialMediaLinkAction(developerId, networkName),

    // Confirmation modal configuration
    confirmTitle: "Delete social media link?",
    confirmDescription: `Are you sure you want to delete your ${socialMediaLink.network} profile link? This action cannot be undone.`,

    // User feedback messages
    successMessage: `${socialMediaLink.network} profile link deleted successfully`,
    errorMessage: "Failed to delete social media link",
  });

  // Dynamically choose wrapper based on className prop
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Delete icon triggers confirmation modal */}
      <DeleteIcon onClick={deleteOperation.openConfirmModal} size={size} />

      {/* Confirmation modal with delete operation handlers */}
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
