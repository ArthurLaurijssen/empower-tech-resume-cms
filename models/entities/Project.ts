import { DeveloperSkill } from "@/models/entities/DeveloperSkill";
import { BaseEntity } from "@/models/common/BaseEntity";

/**
 * Represents a project entity.
 * @extends BaseEntity
 */
export interface Project extends BaseEntity {
  /**
   * The URL of the project's image.
   * @type {string}
   */
  imageUrl: string;

  /**
   * The title of the project.
   * @type {string}
   */
  title: string;

  /**
   * The description of the project.
   * @type {string}
   */
  description: string;

  /**
   * An array of developer skills associated with the project.
   * @type {DeveloperSkill[]}
   */
  developerSkills: DeveloperSkill[];
}
