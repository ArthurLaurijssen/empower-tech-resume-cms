/**
 * Properties for Add Skill Button Component
 *
 * Defines the identifier required to associate a new skill
 * with a specific developer's profile
 */
export interface AddSkillButtonProps {
  /**
   * Unique identifier for the developer
   * Ensures the new skill is precisely linked to the correct profile
   */
  developerId: string;
}
