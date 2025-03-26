/**
 * Properties for the Projects and Skills Page Header
 *
 * Defines the required prop for identifying the specific developer
 * whose skills and projects are being displayed or managed
 */
export interface ProjectsAndSkillsHeaderProps {
  /**
   * Unique identifier for the developer
   * Used to associate skills, projects, and actions with the correct user profile
   */
  developerId: string;
}
