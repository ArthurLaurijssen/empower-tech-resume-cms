/**
 * IconBase Component
 *
 * Provides a flexible, reusable base for creating SVG icons
 * Allows customization of size, color, and additional SVG attributes
 */
import React from "react";
import { IconProps } from "@/components/icons/base/types";

export const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = "currentColor",
  className = "",
  children,
  ...props
}) => {
  return (
    // Flexible SVG wrapper with configurable attributes
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      className={className}
      viewBox="0 0 16 16"
      {...props}
    >
      {/* Render child path or shape elements */}
      {children}
    </svg>
  );
};
