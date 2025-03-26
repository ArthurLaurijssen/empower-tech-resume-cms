"use client";

import { NavigationItemProps } from "@/components/navigation/types";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * A navigation item component specifically for mobile menus.
 *
 * - If `requiresDeveloperId` is `true` and `developerId` is missing, this item
 *   is not rendered.
 * - Dynamically replaces `[developerId]` in `href` if a `developerId` is provided.
 * - Highlights the current item as active if the current pathname matches
 *   or starts with the resolved href.
 *
 * @param {NavigationItemProps} props - The props for the mobile navigation item.
 * @param {NavigationLinkItem} props.navigationLinkItem - Includes `label`, `href`, and `requiresDeveloperId`.
 * @param {string} [props.developerId] - An optional developer ID used to replace
 *   `[developerId]` in the `href`.
 *
 *   navigation item, or `null` if a developer ID is required but not provided.
 */
export const NavigationMobileItem: React.FC<NavigationItemProps> = ({
  navigationLinkItem: { label, href, requiresDeveloperId },
  developerId,
}: NavigationItemProps) => {
  const pathname = usePathname();

  // Hide if developer ID is required but not present
  if (requiresDeveloperId && !developerId) {
    return null;
  }

  // Resolve the final link destination
  const resolvedHref = developerId
    ? href.replace("[developerId]", developerId)
    : href;

  // Highlight as active if current path matches or starts with the resolved link
  const isActive =
    pathname === resolvedHref || pathname.startsWith(`${resolvedHref}/`);

  return (
    <Link href={resolvedHref} className="block">
      <div
        className={`border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
          isActive
            ? "border-lime-500 bg-lime-50 text-lime-700"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        }`}
      >
        {label}
      </div>
    </Link>
  );
};
