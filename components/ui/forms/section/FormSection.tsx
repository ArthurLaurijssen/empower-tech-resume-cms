/**
 * Form Section Component
 *
 * A React component that renders a styled section of a form with title,
 * optional subtitle, and content area. Features consistent spacing and
 * border styling for form organization.
 *
 * @module FormSection
 */

import { FormSectionProps } from "@/components/ui/forms/types";
import React from "react";

/**
 * FormSection Component
 *
 * Creates a visually distinct section within a form with consistent styling.
 * Includes a title header, optional subtitle, and content area for form fields.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - Section title text
 * @param {string} [props.subTitle] - Optional subtitle text
 * @param {React.ReactNode} props.children - Content to render within the section
 * @param {string} [props.className] - Optional CSS class for wrapper element
 *
 * @example
 * // Basic usage
 * <FormSection title="Personal Information">
 *   <InputField id="name" label="Full Name" />
 *   <InputField id="email" label="Email" type="email" />
 * </FormSection>
 *
 * @example
 * // With subtitle and custom class
 * <FormSection
 *   title="Contact Details"
 *   subTitle="How we can reach you"
 *   className="mt-8"
 * >
 *   <InputField id="phone" label="Phone Number" />
 * </FormSection>
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subTitle,
  children,
  className,
}: FormSectionProps) => {
  // Determine if we need a wrapper div based on className
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Section container with bottom border */}
      <div className="border-b border-gray-900/10 pb-12">
        {/* Section title */}
        <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
        {/* Optional subtitle */}
        {subTitle && <p className="mt-1 text-sm/6 text-gray-600">{subTitle}</p>}
        {/* Content area with consistent top margin */}
        <div className="mt-5">{children}</div>
      </div>
    </Wrapper>
  );
};
