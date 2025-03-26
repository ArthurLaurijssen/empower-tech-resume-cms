/**
 * Properties for Delete Skill Component
 *
 * Defines the comprehensive set of properties required to
 * safely and contextually delete a skill
 */
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

export interface DeleteSkillProps {
  /**
   * The complete skill entity to be deleted
   * Provides full context about the specific skill
   */
  skill: DeveloperSkill;

  /**
   * Unique identifier for the developer owning the skill
   * Ensures precise access control and ownership verification
   */
  developerId: string;

  /**
   * Optional CSS class for styling the delete component
   * Allows for flexible visual customization
   */
  className?: string;

  /**
   * Optional size of the delete icon
   * Provides visual customization with a default fallback
   */
  size?: number;
}
