/**
 * SocialMediaLinkCard Component
 *
 * Renders a single social media link with network-specific icon
 * and provides deletion functionality
 */
import React from "react";
import { SocialMediaCardProps } from "@/app/developer/[developerId]/social-media-links/_components/social-media/card/types";
import { DeleteSocialMediaLink } from "@/app/developer/[developerId]/social-media-links/_components/social-media/delete/DeleteSocialMediaLink";
import { SocialMediaNetwork } from "@/models/enums/SocialMediaNetwork";
import { FacebookIcon } from "@/components/icons/facebook-icon/FacebookIcon";
import { TwitterXIcon } from "@/components/icons/twitter-x-icon/TwitterXIcon";
import { GithubIcon } from "@/components/icons/github-icon/GithubIcon";
import { GitlabIcon } from "@/components/icons/gitlab-icon/GitlabIcon";
import { InstagramIcon } from "@/components/icons/instagram-icon/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon/LinkedInIcon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon/WhatsappIcon";

// Mapping of social media networks to their respective icon components
const SOCIAL_MEDIA_ICONS = {
  [SocialMediaNetwork.Facebook]: FacebookIcon,
  [SocialMediaNetwork.X]: TwitterXIcon,
  [SocialMediaNetwork.Instagram]: InstagramIcon,
  [SocialMediaNetwork.LinkedIn]: LinkedInIcon,
  [SocialMediaNetwork.WhatsApp]: WhatsappIcon,
  [SocialMediaNetwork.Github]: GithubIcon,
  [SocialMediaNetwork.GitLab]: GitlabIcon,
} as const;

export const SocialMediaLinkCard: React.FC<SocialMediaCardProps> = ({
  socialMediaLink,
  developerId,
}: SocialMediaCardProps) => {
  // Retrieve the icon component for the specific social media network
  const IconComponent =
    SOCIAL_MEDIA_ICONS[socialMediaLink.network as SocialMediaNetwork];

  // Prevent rendering if no icon is found
  if (!IconComponent) {
    console.error(`No icon found for network: ${socialMediaLink.network}`);
    return null;
  }

  // Get the human-readable network name
  const networkName = SocialMediaNetwork[socialMediaLink.network];

  return (
    <div>
      <div className="flex justify-between">
        {/* Social media link details */}
        <div className="flex">
          {/* Network-specific icon */}
          {IconComponent && <IconComponent />}

          {/* Network name */}
          <span className="font-medium px-3">{networkName}</span>

          {/* Social media URL */}
          <span className="text-gray-600 pr-3">
            {socialMediaLink.socialMediaUrl}
          </span>
        </div>

        {/* Delete action */}
        <div className="flex">
          <DeleteSocialMediaLink
            socialMediaLink={socialMediaLink}
            developerId={developerId}
            className="text-gray-600 hover:text-red-700"
            size={24}
          />
        </div>
      </div>
    </div>
  );
};
