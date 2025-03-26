/**
 * Properties for Social Media Link Card Component
 *
 * Defines the context and data required to render a single social media link
 */
import { SocialMediaLink } from "@/models/entities/SocialMediaLink";

export interface SocialMediaCardProps {
  /**
   * The complete social media link entity
   * Provides full details of the specific social media connection
   */
  socialMediaLink: SocialMediaLink;

  /**
   * Unique identifier for the developer owning the link
   * Ensures precise access control and ownership tracking
   */
  developerId: string;
}
