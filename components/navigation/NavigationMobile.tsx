"use client";
import React from "react";
import { NavigationMobileItem } from "@/components/navigation/NavigationMobileItem";
import { NavigationMobileProps } from "@/components/navigation/types";
import { ProfileDropdownItemMobile } from "@/components/navigation/ProfileDropdownItemMobile";

/**
 * A mobile-specific navigation component, displayed when the main navigation
 * is toggled on smaller devices. It renders both primary navigation items
 * and profile items in a vertically stacked header.
 *
 * @param {NavigationMobileProps} props - The component props.
 * @param {string} [props.developerId] - An optional developer ID for any routes
 *   that are developer-specific.
 * @param {NavigationLinkItem[]} props.navigationItems - The list of main navigation items
 *   (e.g., Dashboard, Projects) to be displayed in the mobile menu.
 * @param {ProfileLinkItem[]} props.profileItems - The list of profile-related items
 *   (e.g., User Settings, Sign Out) to be displayed in the mobile menu.
 *
 */
export const NavigationMobile: React.FC<NavigationMobileProps> = ({
  developerId,
  navigationItems,
  profileItems,
}: NavigationMobileProps) => {
  return (
    <>
      <div className="sm:hidden" id="mobile-menu">
        {/* Main navigation items */}
        <div className="space-y-1 pt-2 pb-3">
          {navigationItems.map((item) => (
            <NavigationMobileItem
              key={item.action}
              developerId={developerId}
              navigationLinkItem={item}
            />
          ))}
        </div>

        {/* Profile section*/}
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="mt-3 space-y-1">
            {profileItems.map((item) => (
              <ProfileDropdownItemMobile
                key={item.href}
                profileLinkItem={item}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
