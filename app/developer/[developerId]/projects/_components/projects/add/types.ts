/**
 * Properties for the Add Project Button Component
 *
 * Defines the contextual identifiers required to associate a new project
 * with a specific developer's skill profile
 */
export interface AddProjectButtonProps {
  /**
   * Unique identifier for the skill category
   * Helps organize and categorize projects within a developer's skill set
   */
  skillId: string;

  /**
   * Unique identifier for the developer
   * Ensures the project is associated with the correct developer profile
   */
  developerId: string;
}
