import { Experience } from "@/models/entities/Experience";

/**
 * Props interface for the ExperienceList component, which renders a collection
 * of experience entries for a specific developer. This interface establishes
 * the core data requirements needed to display and manage experience entries.
 */
export interface ExperienceListProps {
  // An array of Experience objects representing all experiences to be displayed
  // Each experience contains details like title, dates, location, and description
  experiences: Experience[];

  // The unique identifier of the developer who owns these experiences
  // This ID is used for operations like editing and deleting experiences
  developerId: string;
}
