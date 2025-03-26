/**
 * Properties for Project Card Component
 *
 * Defines the comprehensive set of properties required to
 * render and interact with an individual project within
 * a developer's skill portfolio
 */
import { Project } from "@/models/entities/Project";

export interface ProjectProps {
  /**
   * The complete project entity with all its details
   * Provides full context about the specific project being displayed
   */
  project: Project;

  /**
   * Unique identifier for the developer owning the project
   * Ensures precise context and access control for project operations
   */
  developerId: string;

  /**
   * Unique identifier for the skill category of the project
   * Allows for precise categorization and management of projects
   */
  skillId: string;

  /**
   * Callback function to trigger project editing
   * Provides a mechanism for initiating project modification
   */
  onEditProject(): void;
}
