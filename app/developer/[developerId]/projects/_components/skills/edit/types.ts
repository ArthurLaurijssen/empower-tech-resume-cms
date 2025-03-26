/**
 * Properties for Edit Skill Form Component
 *
 * Defines the context and interaction properties for skill editing
 */
import { DeveloperSkill } from "@/models/entities/DeveloperSkill";

export interface EditSkillFormProps {
  /**
   * The complete skill entity to be edited
   * Provides full context and current details of the skill
   */
  skill: DeveloperSkill;

  /**
   * Unique identifier for the developer owning the skill
   * Ensures precise access control and ownership tracking
   */
  developerId: string;

  /**
   * Callback function to cancel the editing process
   * Provides a mechanism for user-initiated form dismissal
   */
  onCancel: () => void;
}
