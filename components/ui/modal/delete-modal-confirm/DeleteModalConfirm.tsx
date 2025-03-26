import React from "react";
import { DeleteModalConfirmProps } from "./types";
import { Modal } from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/buttons/button/button";

/**
 * DeleteModalConfirm component
 * Renders a confirmation modal for delete actions
 */
export const DeleteModalConfirm: React.FC<DeleteModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start mt-6 mb-6">
        {/* Warning icon */}
        <div className="m-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
          <svg
            className="size-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {/* SVG path for warning icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        {/* Modal content */}
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          {/* Modal title */}
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h3>
          {/* Modal description */}
          <div className="mt-2">
            <p className="text-sm text-gray-500 whitespace-normal break-words">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 sm:mt-4 flex flex-row-reverse">
        {/* Confirm button */}
        <Button
          intent="danger"
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmButtonText}
        </Button>
        {/* Cancel button */}
        <Button intent="info" onClick={onClose} className="me-3" type="button">
          {cancelButtonText}
        </Button>
      </div>
    </Modal>
  );
};
