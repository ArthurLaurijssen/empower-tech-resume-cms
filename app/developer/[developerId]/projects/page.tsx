/**
 * Projects Page Component
 *
 * Renders a developer's projects and skills page with comprehensive error handling
 */
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectsAndSkillsPageHeader } from "@/app/developer/[developerId]/projects/_components/header/ProjectsAndSkillsPageHeader";
import { DeveloperSkillsService } from "@/lib/services/skill/DeveloperSkillsService";
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";
import { SkillsList } from "@/app/developer/[developerId]/projects/_components/skills/list/SkillsList";
import { ProjectsPageProps } from "@/app/developer/[developerId]/projects/types";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";
import { BaseErrorHandler } from "@/components/ui/error/base-error/BaseErrorHandler";
import { BaseError } from "@/lib/types/errors/BaseError";

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  try {
    // Extract developer ID from URL parameters
    const { developerId } = await params;

    // Fetch developer skills with associated projects
    const developerSkills: DeveloperSkill[] =
      await DeveloperSkillsService.getAllDeveloperSkillsWithProjects(
        developerId,
      );

    // Render page with skills and projects information
    return (
      <PageLayout title="Projects">
        <ProjectsAndSkillsPageHeader
          developerId={developerId}
        ></ProjectsAndSkillsPageHeader>
        <SkillsList
          skills={developerSkills}
          developerId={developerId}
        ></SkillsList>
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
          title="Something went wrong trying to fetch Projects"
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
