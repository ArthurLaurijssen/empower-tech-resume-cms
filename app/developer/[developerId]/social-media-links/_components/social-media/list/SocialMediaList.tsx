/**
 * SocialMediaList Component
 *
 * Renders a list of social media links with consistent styling
 * Provides a uniform display of individual social media connections
 */
import React from "react";
import { SocialMediaLinkListProps } from "@/app/developer/[developerId]/social-media-links/_components/social-media/list/types";
import { SocialMediaLinkCard } from "@/app/developer/[developerId]/social-media-links/_components/social-media/card/SocialMediaLinkCard";

export const SocialMediaList: React.FC<SocialMediaLinkListProps> = ({
  socialMediaLinks,
  developerId,
}: SocialMediaLinkListProps) => {
  return socialMediaLinks.map((socialMediaLink) => (
    // Consistent container styling for each social media link
    <div
      key={socialMediaLink.id}
      className="rounded border border-gray-200 p-4 mt-3"
    >
      {/* Render individual social media link card */}
      <SocialMediaLinkCard
        socialMediaLink={socialMediaLink}
        developerId={developerId}
      />
    </div>
  ));
};
