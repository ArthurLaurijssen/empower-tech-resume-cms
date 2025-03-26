/**
 * Developer Profile Page
 *
 * Handles rendering of developer profile edit page with comprehensive error handling
 */
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DeveloperProfileForm } from "@/app/developer/[developerId]/profile/_components/profile/DeveloperProfileForm";
import { ProfilePageProps } from "@/app/developer/[developerId]/profile/types";
import { DeveloperService } from "@/lib/services/developer/DeveloperService";
import { BaseError } from "@/lib/types/errors/BaseError";
import { BaseErrorHandler } from "@/components/ui/error/base-error/BaseErrorHandler";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";

export default async function DeveloperPage({ params }: ProfilePageProps) {
  try {
    // Retrieve developer ID from URL parameters
    const { developerId } = await params;

    // Fetch developer data by ID
    const developer = await DeveloperService.getDeveloperById(developerId);

    // Render profile edit form within page layout
    return (
      <PageLayout title="Edit Developer" subtitle={developer.id}>
        <DeveloperProfileForm developer={developer} />
      </PageLayout>
    );
  } catch (error) {
    // Retrieve developer ID for error context
    const { developerId } = await params;

    // Handle known base errors with specific error handler
    if (error instanceof BaseError) {
      return (
        <BaseErrorHandler
          error={error}
          title="Something went wrong trying to fetch developer"
        ></BaseErrorHandler>
      );
    }

    // Fallback to generic error layout for unexpected errors
    return (
      <ErrorPageLayout
        code="500"
        title="Unexpected Error"
        description="An unexpected error occurred"
        id={developerId}
        reason="Unknown"
      />
    );
  }
}
