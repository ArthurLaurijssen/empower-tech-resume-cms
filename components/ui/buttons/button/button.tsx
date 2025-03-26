/**
 * Button Component
 *
 * Provides a flexible, customizable button with various intent styles
 * Supports different visual variants while maintaining consistent base styling
 */
import React from "react";
import { ButtonProps, Intent } from "./types";

/**
 * Generate button styles based on specified intent
 * @param intent - Visual style of the button
 * @returns Tailwind CSS classes for the button
 */
const getButtonStyles = (intent: Intent): string => {
  // Base styles applied to all buttons
  const baseStyles =
    "block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150";

  // Specific styles for different button intents
  const styles = {
    primary:
      "bg-lime-600 hover:bg-lime-500 focus-visible:outline-lime-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    info: "bg-gray-600 hover:bg-gray-700 text-white",
    white:
      "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  };

  // Combine base and intent-specific styles
  return `${baseStyles} ${styles[intent]}`;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  intent,
  customClassNames,
  ...props
}) => {
  return (
    // Render button with dynamically generated styles
    <button
      className={`${getButtonStyles(intent)} ${customClassNames}`}
      {...props}
    >
      {children}
    </button>
  );
};
