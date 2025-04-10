import React from "react";

/**
 * Defines the possible visual intents for buttons
 * Provides a set of predefined style variations
 */
export type Intent =
  | "primary"
  | "warning"
  | "danger"
  | "success"
  | "info"
  | "white";

/**
 * Properties for Button Component
 *
 * Extends native button attributes with additional styling and content options
 */
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * Button content to be rendered
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for custom styling
   * Allows further customization beyond predefined intents
   */
  customClassNames?: string;

  /**
   * Visual style intent of the button
   * Determines the button's color and appearance
   */
  intent: Intent;
}
