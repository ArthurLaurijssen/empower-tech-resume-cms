import "@/styles/globals.scss";
import React from "react";
import { Navigation } from "@/components/navigation/Navigation";

/**
 * A layout component that wraps dashboard pages to provide consistent structure.
 * Renders a navigation bar and maintains proper spacing for content.
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  /**
   * The content to be rendered within the dashboard layout.
   * Marked as readonly to prevent direct modifications to the children prop,
   * ensuring better predictability and performance.
   */
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* The main navigation bar that appears at the top of every dashboard page */}
      <Navigation />

      {/*
        Content wrapper that provides consistent spacing
        Uses Tailwind's py-10 class to add 2.5rem (40px) of padding
        to the top and bottom of the content area
      */}
      <div className="py-10">{children}</div>
    </>
  );
}
