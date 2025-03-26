"use client";
import React, { createContext, useState } from "react";
import { Toast, ToastContextType, ToastType } from "@/contexts/toast/types";

/**
 * Context for managing toast notifications throughout the application.
 * Initially undefined, it will be populated by the ToastProvider.
 *
 * @type {React.Context<ToastContextType | undefined>}
 */
export const ToastContext: React.Context<ToastContextType | undefined> =
  createContext<ToastContextType | undefined>(undefined);

/**
 * Counter for generating unique IDs for each toast.
 * Using let instead of const as it needs to be mutable.
 * Started at 0 and increments for each new toast.
 */
let nextId = 1;

/**
 * ToastProvider Component
 *
 * Provides toast notification functionality to its child components through React Context.
 * Manages the state of all active toasts and provides methods to show and hide them.
 *
 * Features:
 * - Maintains a list of active toasts
 * - Auto-dismisses toasts after 5 seconds
 * - Provides methods to show and hide toasts
 * - Supports multiple toast types (success, error, warning, info)
 *
 * @component
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use in a component
 * const { showToast } = useToast();
 * showToast("Operation successful", "success");
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the toast context
 * @returns {JSX.Element} Provider component that wraps its children
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * State to store all active toast notifications.
   * Each toast has a unique ID, message, and type.
   */
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Creates and displays a new toast notification.
   * Automatically removes the toast after 5 seconds.
   *
   * @param {string} message - The message to display in the toast
   * @param {ToastType} type - The type of toast (success, error, warning, info)
   */
  const showToast = (message: string, type: ToastType) => {
    // Create new toast with unique ID
    const newToast: Toast = {
      message,
      type,
      id: nextId++,
    };

    // Add new toast to the list
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Set up auto-dismiss after 5 seconds
    setTimeout(() => {
      hideToast(newToast.id);
    }, 5000);
  };

  /**
   * Removes a specific toast notification by its ID.
   *
   * @param {number} id - The unique identifier of the toast to remove
   */
  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Provide the toast context to children
  return (
    <ToastContext.Provider value={{ showToast, hideToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
