"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteDeveloperAction } from "@/lib/actions/developer/delete/deleteDeveloper.server";
import { DeleteModalConfirm } from "@/components/ui/modal/delete-modal-confirm/DeleteModalConfirm";
import { DeleteDeveloperButtonProps } from "@/app/dashboard/_components/developer-actions/types";
import { useDelete } from "@/hooks/useDelete";

/**
 * A button component that manages the deletion of a developer profile, including
 * confirmation, error handling, and navigation after successful deletion.
 *
 * @param props Properties containing the developer ID and name for deletion
 */
export const DeleteDeveloperButton: React.FC<DeleteDeveloperButtonProps> = ({
  developerId,
  developerName,
}) => {
  const router = useRouter();

  // We use the useDelete hook to manage the entire deletion flow. This hook
  // encapsulates all the complex logic for confirmations, loading states,
  // error handling, and success notifications.
  const deleteOperation = useDelete({
    // The deletion logic, including navigation after success
    onDelete: async () => {
      const result = await deleteDeveloperAction(developerId);
      if (result.success) {
        // After successful deletion, navigate to the home page
        router.push("/");
      }
      return result;
    },
    // Customize the messages for developer deletion specifically
    confirmTitle: "Delete Developer",
    confirmDescription: `Are you sure you want to delete ${developerName}? This action cannot be undone.`,
    successMessage: `Developer ${developerName} has been deleted successfully`,
    errorMessage: "Failed to delete developer",
  });

  return (
    <>
      {/* The delete button that triggers the confirmation modal. We maintain
          the same styling but now use our hook's modal control function */}
      <button
        type="button"
        onClick={deleteOperation.openConfirmModal}
        className="text-red-600 hover:text-red-900 ml-4"
      >
        Delete
        <span className="sr-only">, {developerName}</span>
      </button>

      {/* The confirmation modal is now controlled entirely by our hook,
          ensuring consistent behavior with other delete operations */}
      <DeleteModalConfirm
        isOpen={deleteOperation.isOpen}
        onClose={deleteOperation.closeConfirmModal}
        onConfirm={deleteOperation.handleDelete}
        title={deleteOperation.confirmTitle}
        description={deleteOperation.confirmDescription}
        confirmButtonText="Delete"
        isLoading={deleteOperation.isPending}
      />
    </>
  );
};
