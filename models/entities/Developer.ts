import { BaseEntity } from "@/models/common/BaseEntity";
import { Greeting } from "@/models/value-objects/Greeting";
import { Mission } from "@/models/value-objects/Mission";
import { Experience } from "@/models/entities/Experience";
import { SocialMediaLink } from "@/models/entities/SocialMediaLink";
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

/**
 * Represents a developer entity.
 * @extends BaseEntity
 */
export interface Developer extends BaseEntity {
  /** The name of the developer. */
  name: string;

  /** The email address of the developer. */
  email: string;

  /** The URL of the developer's profile image. */
  imageUrl: string;

  /** The ID of the user who created the developer entity. */
  CreatedById: string;

  /** The date and time when the developer entity was created (ISO date string). */
  CreatedAt: string;

  /** The greeting of the developer. */
  greeting: Greeting;

  /** The mission statement of the developer. */
  mission: Mission;

  /** The start date of the developer's IT experience (ISO date string). */
  itExperienceStartDate: string;

  /** The start date of the developer's work experience (ISO date string). */
  workExperienceStartDate: string;

  /** An array of the developer's experiences. */
  experiences: Experience[];

  /** An array of the developer's social media links. */
  socialMediaLinks: SocialMediaLink[];

  /** An array of the developer's proficiencies/skills. */
  developerProficiencies: DeveloperSkill[];
}
