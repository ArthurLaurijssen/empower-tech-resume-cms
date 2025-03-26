/**
 * Properties for Skills List Component
 *
 * Defines the context and data required to render a list of skills
 */
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

export interface SkillsAndProjectsProps {
  /**
   * Collection of developer skills to be displayed
   * Includes associated projects and skill details
   */
  skills: DeveloperSkill[];

  /**
   * Unique identifier for the developer owner
   * Ensures precise context and access control
   */
  developerId: string;
}
