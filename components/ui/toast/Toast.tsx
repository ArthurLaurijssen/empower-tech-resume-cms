"use client";

import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/contexts/toast/types";
import React from "react";

/**
 * Toast Component
 *
 * A flexible toast notification component that displays messages at the top of the page.
 * Supports multiple toast types (success, error, warning, info) with appropriate styling
 * and icons for each type. Toasts can be dismissed manually or will auto-dismiss after
 * a set duration.
 *
 * Features:
 * - Multiple toast types with distinct styling
 * - Accessible dismiss buttons
 * - Responsive design
 * - Stack multiple toasts
 * - Type-safe implementation
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Toast />
 *
 * // Usage with context
 * const { showToast } = useToast();
 * showToast("Operation successful", "success");
 * ```
 *
 * @returns - The toast component or null if no toasts are present
 */
export const Toast: React.FC = () => {
  // Access toast state and management functions from context
  const { toasts, hideToast } = useToast();

  // Early return if no toasts to display
  if (toasts.length === 0) return null;

  return (
    // Container for all toasts with fixed positioning and z-add-and-projects
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Map through each toast and render with appropriate styling */}
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`mx-4 mt-4 rounded-md p-4 ${getToastStyles(toast.type)}`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex">
            {/* Toast icon container */}
            <div className="shrink-0">{getToastIcon(toast.type)}</div>

            {/* Toast message */}
            <div className="ml-3">
              <p className={`text-sm font-medium ${getTextColor(toast.type)}`}>
                {toast.message}
              </p>
            </div>

            {/* Dismiss buttons container */}
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className={`inline-flex rounded-md p-1.5 ${getButtonStyles(toast.type)}`}
                  onClick={() => hideToast(toast.id)}
                  aria-label="Dismiss notification"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Gets the background styling for a toast based on its type.
 *
 * @param {ToastType} type - The type of toast (success, error, warning, info)
 * @returns {string} Tailwind CSS classes for the toast background
 */
function getToastStyles(type: ToastType): string {
  const styles = {
    success: "bg-green-50",
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-50",
  };
  return styles[type];
}

/**
 * Gets the text color styling for a toast based on its type.
 *
 * @param {ToastType} type - The type of toast (success, error, warning, info)
 * @returns {string} Tailwind CSS classes for the text color
 */
function getTextColor(type: ToastType): string {
  const colors = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  };
  return colors[type];
}

/**
 * Gets the buttons styling for a toast's dismiss buttons based on its type.
 * Includes hover states and focus ring styles for accessibility.
 *
 * @param {ToastType} type - The type of toast (success, error, warning, info)
 * @returns {string} Tailwind CSS classes for the buttons styling
 */
function getButtonStyles(type: ToastType): string {
  const styles = {
    success:
      "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50",
    error:
      "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50",
    warning:
      "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50",
    info: "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50",
  };
  return styles[type];
}

/**
 * Gets the appropriate icon SVG path for a toast based on its type.
 * Icons are designed to be meaningful and accessible, following common UI patterns:
 * - Success: Checkmark in circle
 * - Error: X in circle
 * - Warning: Exclamation in triangle
 * - Info: Information icon
 *
 * @param {ToastType} type - The type of toast (success, error, warning, info)
 * @returnsSVG path element for the icon
 */
function getToastIcon(type: ToastType) {
  const iconPath = {
    success: (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    ),
    error: (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
        clipRule="evenodd"
      />
    ),
    warning: (
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    ),
    info: (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-12a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V6Zm-1 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    ),
  };

  // Return the SVG wrapper with appropriate styling based on toast type
  return (
    <svg
      className={`size-5 ${
        type === "error"
          ? "text-red-400"
          : type === "success"
            ? "text-green-400"
            : type === "warning"
              ? "text-yellow-400"
              : "text-blue-400"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      {iconPath[type]}
    </svg>
  );
}
