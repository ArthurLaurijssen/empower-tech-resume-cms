/**
 * Uncontrolled Input Field Component
 *
 * A React component that renders an uncontrolled input field with optional label.
 * Features:
 * - Uncontrolled input behavior
 * - Optional label
 * - Configurable input type
 * - Default value formatting
 * - Consistent styling with focus states
 *
 * @module UncontrolledInputField
 */

import React from "react";
import { InputProps } from "@/components/ui/forms/types";
import { formatInputValue } from "@/lib/utils/date";

/**
 * UncontrolledInputField Component
 *
 * Renders an uncontrolled input field with optional wrapper and label.
 * Uses formatInputValue utility for proper default value formatting based on input type.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the input field
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.className] - Optional CSS class for wrapper
 * @param {string} props.type - Input type (text, date, number, etc.)
 * @param {string | number | Date} [props.defaultValue] - Default value for the input
 *
 * @example
 * // Basic text input
 * <UncontrolledInputField
 *   id="name"
 *   type="text"
 *   label="Full Name"
 * />
 *
 * @example
 * // Date input with default value
 * <UncontrolledInputField
 *   id="birthdate"
 *   type="date"
 *   label="Birth Date"
 *   defaultValue={new Date()}
 * />
 */
export const UncontrolledInputField: React.FC<InputProps> = ({
  id,
  label,
  className,
  type,
  defaultValue,
}: InputProps) => {
  // Determine if we need a wrapper div based on className
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Optional label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      {/* Input container with conditional margin when label exists */}
      <div className={label ? "mt-2" : ""}>
        <input
          id={id}
          name={id}
          type={type}
          defaultValue={formatInputValue(defaultValue, type)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6 focus:outline-none"
        />
      </div>
    </Wrapper>
  );
};
