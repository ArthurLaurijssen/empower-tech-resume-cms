/**
 * Developer Layout Component
 *
 * Provides a consistent layout for developer-specific pages
 * Includes navigation and standardized page content spacing
 */
import "@/styles/globals.scss";
import React from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { DeveloperLayoutProps } from "@/app/developer/[developerId]/types";

export default async function DeveloperLayout({
  children,
  params,
}: DeveloperLayoutProps) {
  // Extract developer ID from URL parameters
  const { developerId } = await params;

  return (
    <>
      {/* Navigation bar with developer-specific context */}
      <Navigation developerId={developerId} />

      {/* Main content area with consistent vertical padding */}
      <div className="py-10">{children}</div>
    </>
  );
}
