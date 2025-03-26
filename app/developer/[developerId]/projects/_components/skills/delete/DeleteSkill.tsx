/**
 * DeleteSkill Component
 *
 * Provides a robust, user-friendly mechanism for deleting skills
 * with comprehensive confirmation and error handling
 */
"use client";
import React from "react";
import { DeleteSkillProps } from "@/app/developer/[developerId]/projects/_components/skills/delete/types";
import { deleteSkillAction } from "@/lib/actions/skill/delete/deleteSkill.server";
import { DeleteModalConfirm } from "@/components/ui/modal/delete-modal-confirm/DeleteModalConfirm";
import { DeleteIcon } from "@/components/icons/delete-icon/DeleteIcon";
import { useDelete } from "@/hooks/useDelete";

export const DeleteSkill: React.FC<DeleteSkillProps> = ({
  skill,
  developerId,
  className,
  size = 16,
}: DeleteSkillProps) => {
  // Custom hook manages all deletion-related logic and state
  const deleteOperation = useDelete({
    // Server action to delete the specific skill
    onDelete: () => deleteSkillAction(developerId, skill.id),
    // Confirmation modal configuration
    confirmTitle: "Delete developer skill?",
    confirmDescription: `Are you sure you want to delete ${skill.technologyName}? This action cannot be undone.`,
    // User feedback messages
    successMessage: "Skill deleted successfully",
    errorMessage: "Failed to delete skill",
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
