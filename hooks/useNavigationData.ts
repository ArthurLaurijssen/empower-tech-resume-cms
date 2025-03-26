import {
  NavigationAction,
  NavigationLinkItem,
  NavigationType,
  ProfileLinkItem,
} from "@/components/navigation/types";

/**
 * A custom hook that provides navigation and profile menu items for the application.
 *
 * @returns An object containing two arrays:
 *          `navigationItems` for the main navigation links and
 *          `profileItems` for profile-related (actions).
 */
export function useNavigationData(): {
  navigationItems: NavigationLinkItem[];
  profileItems: ProfileLinkItem[];
} {
  /**
   * The main navigation items define primary routes in the application.
   * Each item can be disabled on certain paths if required.
   */
  const navigationItems: NavigationLinkItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      type: NavigationType.LINK,
      action: NavigationAction.DASHBOARD,
      requiresDeveloperId: false,
    },
    {
      label: "Developer",
      href: "/developer/[developerId]/profile",
      type: NavigationType.LINK,
      action: NavigationAction.DEVELOPER,
      requiresDeveloperId: true,
    },
    {
      label: "Projects",
      href: "/developer/[developerId]/projects",
      type: NavigationType.LINK,
      action: NavigationAction.PROJECTS,
      requiresDeveloperId: true,
    },
    {
      label: "Experiences",
      href: "/developer/[developerId]/experiences",
      type: NavigationType.LINK,
      action: NavigationAction.EXPERIENCES,
      requiresDeveloperId: true,
    },
    {
      label: "Social Media Links",
      href: "/developer/[developerId]/social-media-links",
      type: NavigationType.LINK,
      action: NavigationAction.SOCIAL_MEDIA_LINKS,
      requiresDeveloperId: true,
    },
  ];

  /**
   * The profile items are typically displayed in a dropdown menu
   * for user-specific (actions) like signing out.
   */
  const profileItems: ProfileLinkItem[] = [
    {
      label: "Sign out",
      href: "/auth/logout",
      type: NavigationType.ACTION,
      action: NavigationAction.SIGN_OUT,
    },
  ];

  return { navigationItems, profileItems };
}
