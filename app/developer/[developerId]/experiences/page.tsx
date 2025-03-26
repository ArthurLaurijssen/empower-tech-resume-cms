import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BaseError } from "@/lib/types/errors/BaseError";
import { BaseErrorHandler } from "@/components/ui/error/base-error/BaseErrorHandler";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";
import { ExperiencePageProps } from "@/app/developer/[developerId]/experiences/types";
import { Experience } from "@/models/entities/Experience";
import { ExperiencesService } from "@/lib/services/experience/ExperiencesService";
import { AddExperienceModalButton } from "@/app/developer/[developerId]/experiences/_components/experience/add/AddExperienceModalButton";
import { ExperienceList } from "@/app/developer/[developerId]/experiences/_components/experience/list/ExperienceList";

/**
 * ExperiencesPage serves as the main page for managing a developer's professional experiences.
 * This page implements a robust error handling strategy to ensure a good user experience even
 * when things go wrong. The page follows a common pattern in our application: fetching data,
 * displaying it in a structured layout, and providing intuitive controls for data manipulation.
 *
 * Key features of this page include:
 * - Fetching and displaying all experiences for a specific developer
 * - Providing an interface to add new experiences via a modal
 * - Graceful error handling with appropriate user feedback
 * - Consistent layout and styling with the rest of the application
 *
 * @param params - Contains the developerId from the URL parameters
 */
export default async function ExperiencesPage({ params }: ExperiencePageProps) {
  try {
    // Extract the developer ID from the URL parameters and fetch their experiences
    // This is done within a try block to handle potential fetch failures gracefully
    const { developerId } = await params;
    const experiences: Experience[] =
      await ExperiencesService.getAllExperiences(developerId);

    // The happy path: render the main experience management interface
    return (
      <PageLayout title="Experience" subtitle="Manage your experiences here.">
        {/* Header section with title and add button */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Your experiences</h1>
          {/* Add button renders as a modal trigger for creating new experiences */}
          <AddExperienceModalButton developerId={developerId} />
        </div>
        {/* Main content section displaying the list of experiences */}
        <ExperienceList experiences={experiences} developerId={developerId} />
      </PageLayout>
    );
  } catch (error) {
    // Error handling section - extracts developerId even in error case for error display
    const { developerId } = await params;

    // Handle known error types with our custom error component
    if (error instanceof BaseError) {
      return (
        <BaseErrorHandler
          error={error}
          title="Something went wrong trying to fetch Experiences"
        />
      );
    }

    // Fallback error handling for unexpected errors
    // This ensures users always get meaningful feedback, even for unforeseen issues
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
