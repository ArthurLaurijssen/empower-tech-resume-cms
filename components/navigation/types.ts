/**
 * An enumeration of navigation item types.ts
 *
 * - `LINK`: A standard navigation link.
 * - `ACTION`: A specialized navigation action (e.g., Sign Out).
 */
export enum NavigationType {
  LINK = "LINK",
  ACTION = "ACTION",
}

/**
 * An enumeration of possible navigation (actions).
 *
 * - `SIGN_OUT`: Signs the user out.
 * - `DASHBOARD`: Navigates to the dashboard view.
 * - `DEVELOPER`: Navigates to a developer-specific page.
 * - `PROJECTS`: Navigates to the projects page.
 * - `EXPERIENCES`: Navigates to the experiences page.
 */
export enum NavigationAction {
  SIGN_OUT = "SIGN_OUT",
  DASHBOARD = "DASHBOARD",
  DEVELOPER = "DEVELOPER",
  PROJECTS = "PROJECTS",
  EXPERIENCES = "EXPERIENCES",
  SOCIAL_MEDIA_LINKS = "SOCIAL_MEDIA_LINKS",
}

/**
 * Base interface for all navigation items. These items form the foundation
 * of your application's navigation structure.
 */
export interface BaseNavigationLink {
  /**
   * The text label that appears to users.
   */
  label: string;
  /**
   * The URL or route this item points to, or endpoint if it’s an action.
   */
  href: string;
  /**
   * The type of navigation item: `LINK` or `ACTION`.
   */
  type: NavigationType;
  /**
   * The navigation action associated with this item.
   */
  action: NavigationAction;
}

/**
 * Extension of the base navigation interface that supports requiring
 * a developer ID for certain links (e.g., pages restricted to developers).
 */
export interface NavigationLinkItem extends BaseNavigationLink {
  /**
   * Indicates whether a developer ID is required for this item.
   */
  requiresDeveloperId: boolean;
}

/**
 * Props for rendering a single navigation item.
 */
export interface NavigationItemProps {
  /**
   * The navigation item being displayed.
   */
  navigationLinkItem: NavigationLinkItem;
  /**
   * An optional developer ID. If provided, may control conditional display
   * of items that require a developer ID.
   */
  developerId?: string;
}

/**
 * A profile-specific navigation item, often used in a user profile menu.
 */
export type ProfileLinkItem = BaseNavigationLink;

/**
 * Props for rendering a single profile-related item.
 */
export interface ProfileItemProps {
  /**
   * The profile link item being displayed.
   */
  profileLinkItem: ProfileLinkItem;
  /**
   * An optional callback triggered when a user interacts with this profile item.
   */
  onAction?: () => void;
}

/**
 * Props for a top-level navigation component that may or may not require
 * a developer ID for certain links.
 */
export interface NavigationProps {
  /**
   * An optional developer ID used to filter or enable certain links.
   */
  developerId?: string;
}

/**
 * Props for a mobile-specific navigation component, containing both
 * standard navigation items and profile items.
 */
export interface NavigationMobileProps {
  /**
   * An optional developer ID used to filter or enable certain links.
   */
  developerId?: string;
  /**
   * An array of navigation items to be displayed.
   */
  navigationItems: NavigationLinkItem[];
  /**
   * An array of profile items typically shown in a user profile menu.
   */
  profileItems: ProfileLinkItem[];
}
