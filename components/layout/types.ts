import React from "react";

/**
 * The properties required by the PageLayout component.
 */
export interface PageLayoutProps {
  /** The page content to be displayed in the header's main area. */
  children: React.ReactNode;

  /** The primary heading or title of the page. */
  title: string;

  /** An optional secondary line of text providing more context for the page. */
  subtitle?: string;
}
