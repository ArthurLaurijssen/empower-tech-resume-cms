/**
 * @fileoverview Custom hook for accessing toast notifications functionality throughout the application.
 */

import { useContext } from "react";
import { ToastContextType } from "@/contexts/toast/types";
import { ToastContext } from "@/contexts/toast/ToastContext";

/**
 * Custom hook that provides access to toast notification functionality.
 * This hook simplifies the process of showing and managing toast notifications
 * from any component in the application.
 *
 * Features:
 * - Type-safe access to toast context
 * - Error handling for improper usage
 * - Access to show/hide methods and current toasts state
 *
 * @hook
 * @throws {Error} When used outside a ToastProvider component
 * @returns {ToastContextType} Object containing toast management methods and state
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { showToast } = useToast();
 * showToast("Operation successful", "success");
 *
 * // Complete usage
 * const { showToast, hideToast, toasts } = useToast();
 *
 * // Show different types of toasts
 * showToast("Data saved", "success");
 * showToast("Something went wrong", "error");
 * showToast("Please note", "info");
 * showToast("Proceed with caution", "warning");
 *
 */
export const useToast = (): ToastContextType => {
  // Get the toast context
  const context = useContext(ToastContext);

  // Ensure the hook is used within a ToastProvider
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
