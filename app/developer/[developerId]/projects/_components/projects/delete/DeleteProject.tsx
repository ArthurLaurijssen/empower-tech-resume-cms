/**
 * DeleteProject Component
 *
 * Provides a robust, user-friendly mechanism for deleting projects
 * with comprehensive confirmation and error handling
 */
"use client";

import React from "react";
import { DeleteModalConfirm } from "@/components/ui/modal/delete-modal-confirm/DeleteModalConfirm";
import { DeleteIcon } from "@/components/icons/delete-icon/DeleteIcon";
import { DeleteProjectProps } from "@/app/developer/[developerId]/projects/_components/projects/delete/types";
import { deleteProjectAction } from "@/lib/actions/project/delete/deleteProject.server";
import { useDelete } from "@/hooks/useDelete";

export const DeleteProject: React.FC<DeleteProjectProps> = ({
  project,
  skillId,
  developerId,
  className,
  size = 16,
}: DeleteProjectProps) => {
  // Custom hook manages all deletion-related logic and state
  const deleteOperation = useDelete({
    // Server action to delete the specific project
    onDelete: () => deleteProjectAction(developerId, skillId, project.id),
    // Confirmation modal configuration
    confirmTitle: "Delete project?",
    confirmDescription: `Are you sure you want to delete ${project.title}? This action cannot be undone.`,
    // User feedback messages
    successMessage: "Project deleted successfully",
    errorMessage: "Failed to delete project",
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
