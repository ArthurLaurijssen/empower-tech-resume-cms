import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

/**
 * Properties for Skill and Projects Component
 *
 * Defines the context and interaction properties for a skill with its projects
 */
export interface SkillAndProjectsProps {
  /**
   * The complete skill entity with associated projects
   */
  skill: DeveloperSkill;

  /**
   * Unique identifier for the developer owner
   */
  developerId: string;

  /**
   * Callback function to trigger skill editing
   */
  onEditSkill: () => void;
}
