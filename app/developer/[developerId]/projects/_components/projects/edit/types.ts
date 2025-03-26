/**
 * Properties for the Edit Project Form Component
 *
 * Defines the comprehensive set of properties required to
 * contextually edit a project within a developer's portfolio
 */
import { Project } from "@/models/entities/Project";

export interface EditProjectFormProps {
  /**
   * The complete project entity to be edited
   * Provides full context and current details of the specific project
   */
  project: Project;

  /**
   * Unique identifier for the skill category of the project
   * Allows for precise tracking and management of project modifications
   */
  skillId: string;

  /**
   * Unique identifier for the developer owning the project
   * Ensures precise access control and contextual editing
   */
  developerId: string;

  /**
   * Callback function to cancel the edit operation
   * Provides a mechanism for user-initiated form dismissal
   */
  onCancel: () => void;
}
