import { Experience } from "@/models/entities/Experience";

/**
 * Props for the DeleteExperience component that handles the deletion of experience entries.
 * Includes required data for deletion and optional styling properties.
 */
export interface DeleteExperienceProps {
  // The experience entry to be deleted
  experience: Experience;

  // The ID of the developer who owns this experience
  developerId: string;

  // Optional CSS class name for custom styling
  className?: string;

  // Optional size value for the delete icon in pixels
  size?: number;
}
