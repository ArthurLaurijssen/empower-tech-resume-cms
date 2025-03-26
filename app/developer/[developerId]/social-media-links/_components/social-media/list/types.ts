/**
 * Properties for Social Media Link List Component
 *
 * Defines the context and data required to render a collection of social media links
 */
import { SocialMediaLink } from "@/models/entities/SocialMediaLink";

export interface SocialMediaLinkListProps {
  /**
   * Collection of social media links to be displayed
   * Provides the complete set of link entities for rendering
   */
  socialMediaLinks: SocialMediaLink[];

  /**
   * Unique identifier for the developer owning the links
   * Ensures precise access control and ownership tracking
   */
  developerId: string;
}
