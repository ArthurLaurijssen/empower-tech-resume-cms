"use client";
import {
  NavigationAction,
  NavigationType,
  ProfileItemProps,
} from "@/components/navigation/types";
import React from "react";
import Link from "next/link";

/**
 * A dropdown menu item for the user's profile menu. If the item is a link, it renders as an anchor tag.
 * If the item is an action (e.g., sign out), it performs that action on click.
 *
 * @param item - The profile item data, including label, type, action, and href.
 * @param onAction - An optional callback function invoked after the action or link is clicked.
 *
 * @returns A JSX element for the dropdown menu item.
 */
export const ProfileDropdownItem: React.FC<ProfileItemProps> = ({
  profileLinkItem: item,
  onAction,
}: ProfileItemProps) => {
  /**
   * Handles the click event for action-type items.
   * Currently, supports sign-out by redirecting the user to the `/auth/logout` route.
   */
  const handleClick = async () => {
    if (item.type === NavigationType.ACTION) {
      switch (item.action) {
        case NavigationAction.SIGN_OUT:
          // For sign out, perform a full page navigation.
          window.location.href = "/auth/logout";
          break;
      }
    }
    // Call the onAction callback if provided.
    onAction?.();
  };

  // If the item is a link, render a next/link element for client-side transitions
  if (item.type === NavigationType.LINK) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onAction}
      >
        {item.label}
      </Link>
    );
  }

  // Otherwise, render a buttons for (actions) such as signing out
  return (
    <button
      onClick={handleClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {item.label}
    </button>
  );
};
