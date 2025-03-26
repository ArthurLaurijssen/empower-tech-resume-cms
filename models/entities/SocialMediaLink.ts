import { SocialMediaNetwork } from "@/models/enums/SocialMediaNetwork";
import { BaseEntity } from "@/models/common/BaseEntity";

/**
 * Represents a social media link entity.
 * @extends BaseEntity
 */
export interface SocialMediaLink extends BaseEntity {
  /**
   * The URL of the social media profile.
   * @type {string}
   */
  socialMediaUrl: string;

  /**
   * The social media network associated with the link.
   * @type {SocialMediaNetwork}
   */
  network: SocialMediaNetwork;
}
