/**
 * @fileoverview Type definitions for the Toast notification system.
 * This file contains all the types and interfaces used throughout
 * the toast notification components.
 */

/**
 * Defines the possible types of toast notifications.
 * Each type corresponds to a different visual style and icon:
 * - success: Green theme, checkmark icon
 * - error: Red theme, X icon
 * - warning: Yellow theme, exclamation icon
 * - info: Blue theme, information icon
 *
 * @type {string}
 */
export type ToastType = "success" | "error" | "warning" | "info";

/**
 * Represents a single toast notification.
 * Each toast has a unique identifier, message content, and a type
 * that determines its visual appearance.
 *
 * @interface Toast
 * @property {string} message - The text content to display in the toast
 * @property {ToastType} type - The category/style of the toast notification
 * @property {number} id - Unique identifier for managing individual toasts
 *
 * @example
 * ```typescript
 * const successToast: Toast = {
 *   message: "Operation completed successfully",
 *   type: "success",
 *   id: 1
 * };
 * ```
 */
export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

/**
 * Defines the shape of the toast context that will be provided
 * throughout the application. Contains all the methods and state
 * needed to manage toast notifications.
 *
 * @interface ToastContextType
 * @property {function} showToast - Function to display a new toast notification
 * @property {function} hideToast - Function to remove a specific toast by ID
 * @property {Toast[]} toasts - Array of currently active toast notifications
 *
 * @example
 * ```typescript
 * // Using the context in a component
 * const toastContext: ToastContextType = {
 *   showToast: (msg, type) => { ... },
 *   hideToast: (id) => { ... },
 *   toasts: []
 * };
 * ```
 */
export interface ToastContextType {
  /**
   * Displays a new toast notification.
   *
   * @param {string} message - The content to display in the toast
   * @param {ToastType} type - The type/style of toast to show
   */
  showToast: (message: string, type: ToastType) => void;

  /**
   * Removes a specific toast from view.
   *
   * @param {number} id - The unique identifier of the toast to remove
   */
  hideToast: (id: number) => void;

  /**
   * Array of all currently visible toasts.
   * Each toast in the array is managed by the toast context.
   */
  toasts: Toast[];
}
