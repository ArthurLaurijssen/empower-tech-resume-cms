import { BaseEntity } from "@/models/common/BaseEntity";
import { ExperienceType } from "@/models/enums/ExperienceType";

/**
 * Represents an experience entity.
 * @extends BaseEntity
 */
export interface Experience extends BaseEntity {
  /**
   * The type of experience.
   * @type {ExperienceType}
   */
  experienceType: ExperienceType;

  /**
   * The start date of the experience.
   * @type {string}
   */
  startDate: string;

  /**
   * The end date of the experience.
   * @type {string | null}
   */
  endDate: string | null;

  /**
   * The location name of the experience.
   * @type {string}
   */
  locationName: string;

  /**
   * The title of the experience.
   * @type {string}
   */
  title: string;

  /**
   * The description of the experience.
   * @type {string}
   */
  description: string;
}
