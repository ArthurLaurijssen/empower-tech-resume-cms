/**
 * Properties for Social Media Page Component
 *
 * Defines the structure of URL parameters for a developer's social media page
 * Uses a Promise to support Next.js dynamic routing and async parameter resolution
 */
export interface SocialMediaPageProps {
  /**
   * URL parameters with developer ID
   * Wrapped in a Promise to support asynchronous route parameter handling
   */
  params: Promise<{
    /** Unique identifier for the developer */
    developerId: string;
  }>;
}
