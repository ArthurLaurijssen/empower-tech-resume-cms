// types.ts

/**
 * Props interface for the ExperiencesPage component.
 * Represents the expected URL parameters passed to the page.
 */
export interface ExperiencePageProps {
  // params is a Promise that resolves to an object containing the developerId
  // This Promise structure is typical for Next.js dynamic route parameters
  params: Promise<{
    developerId: string; // Unique identifier for the developer
  }>;
}
