/**
 * Properties for Icon Components
 *
 * Defines a flexible interface for configuring SVG icons
 * Extends standard SVG attributes with additional customization options
 */
import React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Size of the icon in pixels
   * Provides easy size customization with a default value
   */
  size?: number;

  /**
   * Color of the icon
   * Allows dynamic color setting with fallback to current text color
   */
  color?: string;

  /**
   * Additional CSS classes for styling
   * Enables flexible visual customization
   */
  className?: string;
}
