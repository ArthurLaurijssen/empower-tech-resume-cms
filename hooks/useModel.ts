/**
 * @fileoverview Custom React hook for managing modal dialog state and lifecycle
 *
 * This hook provides a complete solution for handling modal dialogs in React applications.
 * It manages:
 * - Modal visibility state
 * - Opening and closing transitions
 * - State toggling
 * - Lifecycle callbacks for state changes
 *
 * The hook follows the principle of controlled state management, providing both
 * direct state access and state modification methods. It's designed to be flexible
 * enough to work with any modal UI implementation while maintaining a consistent API.
 */

import { useState } from "react";
import { UseModalConfig } from "@/hooks/types";

/**
 * A custom hook that provides modal state management and lifecycle methods
 *
 * This hook creates a controlled interface for managing modal visibility. It maintains
 * an internal state for the modal's open/closed status and provides methods to
 * modify this state. Each state change can trigger optional callback functions,
 * allowing for side effects like analytics tracking or additional UI updates.
 *
 * The hook follows React's state management best practices by using a functional
 * update pattern for the toggle operation, ensuring state updates are based on
 * the most current state value.
 *
 * @param {UseModalConfig} config - Configuration object for modal behavior
 * @param {boolean} [config.initialState=false] - Initial visibility state of the modal
 * @param {Function} [config.onOpen] - Callback executed when modal opens
 * @param {Function} [config.onClose] - Callback executed when modal closes
 * @param {Function} [config.onToggle] - Callback executed when modal state toggles
 *
 *
 * @returns {boolean} .isOpen - Current visibility state of the modal
 * @returns {Function} .open - Method to open the modal
 * @returns {Function} .close - Method to close the modal
 * @returns {Function} .toggle - Method to toggle the modal state
 *
 * @example
 * ```tsx
 * const modal = useModal({
 *   initialState: false,
 *   onOpen: () => console.log('Modal opened'),
 *   onClose: () => console.log('Modal closed')
 * });
 *
 * return (
 *   <>
 *     <button onClick={modal.open}>Open Modal</button>
 *     {modal.isOpen && <Modal onClose={modal.close}>Content</Modal>}
 *   </>
 * );
 * ```
 */
export function useModal({
  initialState = false,
  onOpen,
  onClose,
  onToggle,
}: UseModalConfig = {}) {
  // Initialize modal visibility state with the provided initial value
  const [isOpen, setIsOpen] = useState(initialState);

  /**
   * Opens the modal and triggers the onOpen callback if provided
   *
   * This method sets the visibility state to true and executes any
   * provided onOpen callback, allowing for side effects when the
   * modal opens.
   */
  const open = () => {
    setIsOpen(true);
    onOpen?.();
  };

  /**
   * Closes the modal and triggers the onClose callback if provided
   *
   * This method sets the visibility state to false and executes any
   * provided onClose callback, allowing for cleanup or other side
   * effects when the modal closes.
   */
  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  /**
   * Toggles the modal's visibility state and triggers the onToggle callback
   *
   * This method uses a functional update to ensure it always has access to
   * the most current state value when toggling. It also executes any
   * provided onToggle callback after the state change.
   */
  const toggle = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      onToggle?.();
      return newState;
    });
  };

  // Return an object containing the modal's state and control methods
  return {
    isOpen, // Current visibility state
    open, // Method to open the modal
    close, // Method to close the modal
    toggle, // Method to toggle the modal state
  };
}
