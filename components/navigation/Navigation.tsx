"use client";
import {
  NavigationProps,
  ProfileLinkItem,
} from "@/components/navigation/types";
import { NavigationItem } from "@/components/navigation/NavigationItem";
import React, { useState } from "react";
import { useNavigationData } from "@/hooks/useNavigationData";
import { NavigationMobile } from "@/components/navigation/NavigationMobile";
import { ProfileDropdownItem } from "@/components/navigation/ProfileDropdownItem";
import { NavigationLogo } from "@/components/navigation/NavigationLogo";
import { UserIcon } from "@/components/icons/user-icon/UserIcon";
import { ListIcon } from "@/components/icons/list-icon/ListIcon";
import { XIcon } from "@/components/icons/x-icon/XIcon";

/**
 * The main navigation bar component, displayed at the top of the application.
 *
 * This component includes:
 * - A logo (left-aligned).
 * - A set of primary navigation items for desktop view.
 * - A mobile navigation menu toggled by a hamburger/close icon.
 * - A user profile menu with a dropdown for profile-related (actions).
 *
 * The component fetches `navigationItems` and `profileItems` from a custom hook (`useNavigationData`)
 * and conditionally applies a `developerId` to links requiring developer-specific routes.
 *
 * States within the component:
 * - `mobileMenuOpen`: Tracks whether the mobile navigation menu is visible.
 * - `profileMenuOpen`: Tracks whether the profile dropdown menu is open.
 *
 * @param {NavigationProps} props - The navigation component props.
 * @param {string} [props.developerId] - An optional developer ID to route links needing developer context.
 *
 * @returns he rendered navigation bar component, with both desktop and mobile navigations.
 */
export const Navigation: React.FC<NavigationProps> = ({
  developerId,
}: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { navigationItems, profileItems } = useNavigationData();
  /**
   * Closes the profile menu after an action is triggered from a dropdown item.
   */
  const handleProfileAction = () => {
    setProfileMenuOpen(false);
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Left side: Logo and main navigation items */}
            <div className="flex">
              {/* Application Logo */}
              <NavigationLogo />

              {/* Desktop navigation items */}
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <NavigationItem
                    key={item.action}
                    developerId={developerId}
                    navigationLinkItem={item}
                  />
                ))}
              </div>
            </div>

            {/* Right side: Profile menu and mobile menu toggle */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Profile menu */}
              <div className="relative">
                <div>
                  {/* Button to toggle the profile dropdown */}
                  <button
                    type="button"
                    className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <span className="absolute -inset-1.5" />
                    <UserIcon />
                  </button>
                </div>

                {/* Profile dropdown menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {profileItems.map((item: ProfileLinkItem) => (
                      <ProfileDropdownItem
                        key={item.action}
                        profileLinkItem={item}
                        onAction={handleProfileAction}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu buttons (hamburger/close icon) */}
            <div className="-me-2 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="absolute -inset-0.5" />
                {!mobileMenuOpen ? (
                  <ListIcon className="text-gray-600" />
                ) : (
                  <XIcon />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation menu displayed when `mobileMenuOpen` is true */}
        {mobileMenuOpen && (
          <NavigationMobile
            navigationItems={navigationItems}
            profileItems={profileItems}
            developerId={developerId}
          />
        )}
      </nav>
    </>
  );
};
