/**
 * Uncontrolled TextArea Input Component
 *
 * A React component that renders an uncontrolled textarea input with optional
 * label and description. Provides consistent styling and behavior for
 * multi-line text input fields.
 *
 * @module UncontrolledTextAreaInput
 */

import { TextAreaProps } from "@/components/ui/forms/types";
import React from "react";

/**
 * UncontrolledTextAreaInput Component
 *
 * Renders an uncontrolled textarea with optional label and description text.
 * Features consistent styling and focus states matching other form components.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the textarea
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.className] - Optional CSS class for wrapper
 * @param {string} [props.description] - Optional help text displayed below the textarea
 * @param {string} [props.defaultValue] - Default text content
 * @param {number} [props.rows] - Number of visible text rows
 *
 * @example
 * // Basic usage
 * <UncontrolledTextAreaInput
 *   id="comments"
 *   label="Comments"
 *   rows={4}
 * />
 *
 * @example
 * // With description and default value
 * <UncontrolledTextAreaInput
 *   id="bio"
 *   label="Biography"
 *   description="Tell us about yourself"
 *   defaultValue="I am a..."
 *   rows={6}
 *   className="mt-4"
 * />
 */
export const UncontrolledTextAreaInput: React.FC<TextAreaProps> = ({
  id,
  label,
  className,
  description,
  defaultValue,
  rows,
}: TextAreaProps) => {
  // Determine if we need a wrapper div based on className
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Optional label */}
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      {/* Textarea container with conditional top margin when label exists */}
      <div className={label ? "mt-2" : ""}>
        <textarea
          id={id}
          name={id}
          rows={rows}
          defaultValue={defaultValue}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6 focus:outline-none"
        />
      </div>
      {/* Optional description text */}
      {description && (
        <p className="mt-3 text-sm text-gray-600">{description}</p>
      )}
    </Wrapper>
  );
};
