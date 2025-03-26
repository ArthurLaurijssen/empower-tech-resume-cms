import { Experience } from "@/models/entities/Experience";

/**
 * Props for the ExperienceCard component that displays individual experience entries.
 */
export interface ExperienceCardProps {
  // The experience entry to display
  experience: Experience;

  // ID of the developer who owns this experience
  developerId: string;

  // Callback function triggered when the edit button is clicked
  onEditExperience(): void;
}
