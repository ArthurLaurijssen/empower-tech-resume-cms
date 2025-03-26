/**
 * Properties for Delete Social Media Link Component
 *
 * Defines the comprehensive set of properties required to
 * safely and contextually delete a social media link
 */
import { SocialMediaLink } from "@/models/entities/SocialMediaLink";

export interface DeleteSocialMediaLinkProps {
  /**
   * The complete social media link entity to be deleted
   * Provides full context about the specific link
   */
  socialMediaLink: SocialMediaLink;

  /**
   * Unique identifier for the developer owning the link
   * Ensures precise access control and ownership verification
   */
  developerId: string;

  /**
   * Optional CSS class for styling the delete component
   * Allows for flexible visual customization
   */
  className?: string;

  /**
   * Optional size of the delete icon
   * Provides visual customization with a default fallback
   */
  size?: number;
}
