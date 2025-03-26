/**
 * Props interface for Projects Page component
 *
 * Defines the structure of URL parameters for a developer's projects page
 * Uses a Promise to handle asynchronous parameter resolution, typical in Next.js dynamic routing
 */
export interface ProjectsPageProps {
  /**
   * URL parameters with developer ID
   * Wrapped in a Promise to support Next.js async route resolution
   */
  params: Promise<{
    /** Unique identifier for the developer */
    developerId: string;
  }>;
}
