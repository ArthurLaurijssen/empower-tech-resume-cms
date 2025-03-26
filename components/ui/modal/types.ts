import React from "react";

export interface ModalProps {
  // Determines whether the modal is visible or not
  isOpen: boolean;

  // Function to be called when the modal should be closed
  onClose: () => void;

  // The content to be rendered inside the modal
  children: React.ReactNode;

  // Optional title for the modal
  title?: string;

  // Optional subtitle or description for the modal
  subtitle?: string;
}
