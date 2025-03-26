/**
 * Properties for Delete Project Component
 *
 * Defines the comprehensive set of properties required to
 * safely and contextually delete a project within a
 * developer's skill portfolio
 */
import { Project } from "@/models/entities/Project";

export interface DeleteProjectProps {
  /**
   * The complete project entity to be deleted
   * Provides full context and details about the specific project
   */
  project: Project;

  /**
   * Unique identifier for the developer owning the project
   * Ensures precise access control and contextual deletion
   */
  developerId: string;

  /**
   * Unique identifier for the skill category of the project
   * Allows for precise tracking and management of project removal
   */
  skillId: string;

  /**
   * Optional CSS class for styling the delete component
   * Provides flexibility in visual presentation
   */
  className?: string;

  /**
   * Optional size of the delete icon
   * Defaults to 16 if not specified, allowing visual customization
   */
  size?: number;
}
