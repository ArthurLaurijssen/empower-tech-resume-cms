/**
 * Properties for Projects Header Component
 *
 * Defines the precise contextual identifiers required to
 * render and interact with a skill-specific projects header
 */
export interface ProjectsHeaderProps {
  /**
   * Unique identifier for the specific skill category
   * Provides granular context for project organization
   */
  skillId: string;

  /**
   * Unique identifier for the developer owner
   * Ensures precise access and ownership tracking
   */
  developerId: string;
}
