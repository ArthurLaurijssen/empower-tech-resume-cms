/**
 * Props for the AddExperienceButton component that allows users to add new experiences.
 * The component only requires the developer's ID to know where to add the new experience.
 */
export interface AddExperienceButtonProps {
  // ID of the developer for whom the new experience will be created
  developerId: string;
}
