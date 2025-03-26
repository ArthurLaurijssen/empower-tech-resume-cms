/**
 * Properties for Skill Header Component
 *
 * Defines the context and interaction properties for a skill header
 */
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

export interface SkillHeaderProps {
  /**
   * The complete skill entity with all its details
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
