/**
 * Properties for Developer Layout Component
 *
 * Defines the structure of props for a dynamic developer-specific layout
 */
import React from "react";

export interface DeveloperLayoutProps {
  /**
   * Child React components to be rendered within the layout
   * Allows for flexible page content composition
   */
  children: React.ReactNode;

  /**
   * URL parameters with developer ID
   * Wrapped in a Promise to support Next.js dynamic routing
   */
  params: Promise<{
    /** Unique identifier for the developer */
    developerId: string;
  }>;
}
