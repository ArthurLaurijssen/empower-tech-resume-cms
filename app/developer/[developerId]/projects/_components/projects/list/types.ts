/**
 * Properties for Projects List Component
 *
 * Defines the context and data required to render a list of projects
 */
import { Project } from "@/models/entities/Project";

export interface ProjectsProps {
  /**
   * Collection of projects to be displayed
   */
  projects: Project[];

  /**
   * Unique identifier for the developer owner
   */
  developerId: string;

  /**
   * Unique identifier for the skill category
   */
  skillId: string;
}
