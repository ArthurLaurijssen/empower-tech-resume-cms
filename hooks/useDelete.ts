/**
 * @fileoverview Custom React hook for managing deletion operations with confirmation
 *
 * This hook provides a complete solution for handling item deletion workflows in React applications.
 * It manages the entire deletion process including:
 * - Confirmation modal state management
 * - Loading states during deletion
 * - Success/error notifications
 * - Navigation after successful deletion
 * - Error handling and user feedback
 *
 * The hook integrates with Next.js router, React transitions, and custom toast/modal hooks
 * to provide a seamless deletion experience.
 */

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useModal } from "@/hooks/useModel";
import { UseDeleteConfig } from "@/hooks/types";

/**
 * A custom hook that manages the complete item deletion workflow
 *
 * This hook orchestrates all aspects of the deletion process, providing a unified
 * interface for handling confirmations, loading states, notifications, and navigation.
 * It uses React's transitions for smooth UI updates and provides comprehensive
 * error handling.
 *
 * @param {UseDeleteConfig} config - Configuration object containing all deletion options
 * @param {Function} config.onDelete - The function that performs the actual deletion
 * @param {Function} [config.onSuccess] - Optional callback executed after successful deletion
 * @param {string} [config.confirmTitle="Delete item?"] - Title for confirmation modal
 * @param {string} [config.confirmDescription] - Description for confirmation modal
 * @param {string} [config.successMessage="Item deleted successfully"] - Success notification message
 * @param {string} [config.errorMessage="Failed to delete item"] - Error notification message
 *
 * @returns {Object} An object containing all necessary state and handlers for deletion flow
 * @returns {boolean} .isOpen - Current open state of the confirmation modal
 * @returns {boolean} .isPending - Loading state during deletion
 * @returns {Function} .openConfirmModal - Handler to open the confirmation modal
 * @returns {Function} .closeConfirmModal - Handler to close the confirmation modal
 * @returns {Function} .handleDelete - Main deletion handler
 * @returns {string} .confirmTitle - Title for the confirmation modal
 * @returns {string} .confirmDescription - Description for the confirmation modal
 *
 * @example
 * ```tsx
 * const deleteOperation = useDelete({
 *   onDelete: () => deleteItemFromAPI(itemId),
 *   onSuccess: () => navigate('/items'),
 *   confirmTitle: "Delete this item?",
 *   successMessage: "Item was successfully removed"
 * });
 * ```
 */
export function useDelete({
  onDelete,
  onSuccess,
  confirmTitle = "Delete item?",
  confirmDescription,
  successMessage = "Item deleted successfully",
  errorMessage = "Failed to delete item",
}: UseDeleteConfig) {
  // Initialize required hooks for managing the deletion workflow
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const modal = useModal();

  /**
   * Main handler for executing the deletion operation
   *
   * This function manages the complete deletion flow:
   * 1. Starts a transition for smooth UI updates
   * 2. Executes the deletion operation
   * 3. Handles success case:
   *    - Shows success notification
   *    - Refreshes the page
   *    - Executes success callback
   *    - Closes the modal
   * 4. Handles failure case:
   *    - Shows error notification
   * 5. Provides comprehensive error handling
   *
   * @returns {Promise<void>}
   * @throws Will catch and handle any errors during deletion
   */
  const handleDelete = async () => {
    try {
      // Wrap deletion in a transition for smooth UI updates
      startTransition(async () => {
        const result = await onDelete();

        if (result.success) {
          // Handle successful deletion
          showToast(result.message || successMessage, "success");
          router.refresh();
          onSuccess?.();
          modal.close();
        } else {
          // Handle deletion failure
          showToast(result.message || errorMessage, "error");
        }
      });
    } catch (error) {
      // Handle unexpected errors with appropriate user feedback
      showToast(
        error instanceof Error ? error.message : "An unexpected error occurred",
        "error",
      );
    }
  };

  // Return an object containing all necessary state and handlers for the deletion flow
  return {
    isOpen: modal.isOpen, // Current modal visibility state
    isPending, // Loading state during deletion
    openConfirmModal: modal.open, // Handler to open confirmation modal
    closeConfirmModal: modal.close, // Handler to close confirmation modal
    handleDelete, // Main deletion handler
    confirmTitle, // Modal title text
    // Modal description text with fallback
    confirmDescription:
      confirmDescription ??
      `Are you sure you want to delete this item? This action cannot be undone.`,
  };
}
