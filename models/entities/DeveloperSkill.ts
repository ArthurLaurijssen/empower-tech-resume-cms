import { Project } from "@/models/entities/Project";
import { BaseEntity } from "@/models/common/BaseEntity";

/**
 * Represents a developer skill entity.
 * @extends BaseEntity
 */
export interface DeveloperSkill extends BaseEntity {
  /**
   * The name of the technology or skill.
   * @type {string}
   */
  technologyName: string;

  /**
   * The proficiency level of the developer in the skill.
   * @type {number}
   */
  proficiencyLevel: number;

  /**
   * An array of projects associated with the skill.
   * @type {Project[]}
   */
  projects: Project[];
}
