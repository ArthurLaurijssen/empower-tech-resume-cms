/**
 * Social Media Page Component
 *
 * Manages the display and interaction of a developer's social media links
 * with comprehensive error handling and user-friendly interface
 */
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BaseError } from "@/lib/types/errors/BaseError";
import { BaseErrorHandler } from "@/components/ui/error/base-error/BaseErrorHandler";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";
import { SocialMediaLinkService } from "@/lib/services/social-media/SocialMediaLinkService";
import { SocialMediaList } from "@/app/developer/[developerId]/social-media-links/_components/social-media/list/SocialMediaList";
import { SocialMediaPageProps } from "@/app/developer/[developerId]/social-media-links/types";
import { AddSocialMediaLinkModalButton } from "@/app/developer/[developerId]/social-media-links/_components/social-media/add/AddSocialMediaLinkModalButton";

export default async function SocialMediaPage({
  params,
}: SocialMediaPageProps) {
  try {
    // Extract developer ID from URL parameters
    const { developerId } = await params;

    // Fetch all social media links for the specific developer
    const socialMediaLinks =
      await SocialMediaLinkService.getAllSocialMediaLinks(developerId);

    // Render the page with social media management interface
    return (
      <PageLayout
        title="Social Media Links:"
        subtitle="Manage your social media links here."
      >
        {/* Header section with title and add link button */}
        <div className="flex justify-between">
          <h1 className="font-medium text-xl">Your links: </h1>
          <AddSocialMediaLinkModalButton
            developerId={developerId}
          ></AddSocialMediaLinkModalButton>
        </div>

        {/* List of social media links with management capabilities */}
        <SocialMediaList
          socialMediaLinks={socialMediaLinks}
          developerId={developerId}
        ></SocialMediaList>
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
          title="Something went wrong trying to fetch social media links"
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
