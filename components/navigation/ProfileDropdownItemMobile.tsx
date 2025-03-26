"use client";
import {
  NavigationAction,
  NavigationType,
  ProfileItemProps,
} from "@/components/navigation/types";
import React from "react";
import Link from "next/link";

export const ProfileDropdownItemMobile: React.FC<ProfileItemProps> = ({
  profileLinkItem: item,
}: ProfileItemProps) => {
  const handleClick = async () => {
    if (item.type === NavigationType.ACTION) {
      switch (item.action) {
        case NavigationAction.SIGN_OUT:
          // Use the same direct navigation approach as desktop
          window.location.href = "/auth/logout";
          break;
      }
    }
  };

  // If it's an action (like sign-out), use a button
  if (item.type === NavigationType.ACTION) {
    return (
      <button
        onClick={handleClick}
        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
        {item.label}
      </button>
    );
  }

  // For regular links, keep using Next.js Link
  return (
    <Link
      href={item.href}
      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    >
      {item.label}
    </Link>
  );
};
