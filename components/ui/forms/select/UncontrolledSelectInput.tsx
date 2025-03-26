/**
 * Uncontrolled Select Input Component
 *
 * A React component that renders an uncontrolled select field with options and optional label.
 * Features:
 * - Uncontrolled select behavior
 * - Optional label
 * - Configurable options array
 * - Default value support
 * - Consistent styling with focus states
 *
 * @module UncontrolledSelectInput
 */

import React from "react";
import { SelectInputProps } from "@/components/ui/forms/types";

/**
 * UncontrolledSelectInput Component
 *
 * Renders an uncontrolled select field with options and optional wrapper and label.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the select field
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.className] - Optional CSS class for wrapper
 * @param {Array<{value: string, label: string}>} props.options - Array of options for select
 * @param {string} [props.defaultValue] - Default selected value
 * @param {boolean} [props.required=true] - Whether the field is required
 *
 * @example
 * // Basic select input
 * <UncontrolledSelectInput
 *   id="country"
 *   label="Select Country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" }
 *   ]}
 * />
 *
 * @example
 * // Select with default value
 * <UncontrolledSelectInput
 *   id="language"
 *   label="Preferred Language"
 *   options={[
 *     { value: "en", label: "English" },
 *     { value: "es", label: "Spanish" }
 *   ]}
 *   defaultValue="en"
 * />
 */
export const UncontrolledSelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  className,
  options,
  defaultValue,
  required = true,
}: SelectInputProps) => {
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
      {/* Select container with conditional margin when label exists */}
      <div className={label ? "mt-2" : ""}>
        <select
          id={id}
          name={id}
          defaultValue={defaultValue || ""}
          required={required}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6 focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Wrapper>
  );
};
