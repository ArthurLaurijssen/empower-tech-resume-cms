/**
 * Props for the ProfilePage component that displays a developer's profile information.
 */
export interface ProfilePageProps {
  // URL parameters containing the developer's unique identifier
  // The Promise wrapper is used because Next.js provides route parameters asynchronously
  params: Promise<{
    developerId: string;
  }>;
}
