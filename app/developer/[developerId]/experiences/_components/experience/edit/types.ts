import { Experience } from "@/models/entities/Experience";

/**
 * Props for the EditExperienceForm component that handles experience editing.
 */
export interface EditExperienceFormProps {
  // The experience entry being edited
  experience: Experience;

  // ID of the developer who owns this experience
  developerId: string;

  // Function to call when edit is cancelled
  onCancel: () => void;
}
