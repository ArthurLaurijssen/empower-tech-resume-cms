"use client";

import { NavigationItemProps } from "@/components/navigation/types";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * A navigation item component for the main navigation bar.
 *
 * - If `requiresDeveloperId` is `true` and no `developerId` is provided,
 *   this item is not rendered.
 * - Dynamically replaces `[developerId]` in the `href` string if a `developerId` is available.
 * - Highlights itself as active when the current route matches or starts with
 *   the resolved `href`.
 *
 * @param {NavigationItemProps} props - The props for the navigation item.
 * @param {NavigationLinkItem} props.navigationLinkItem - The underlying link item, including `label`, `href`, and `requiresDeveloperId`.
 * @param {string} [props.developerId] - An optional developer ID for routes requiring developer-specific paths.
 *
 * or `null` if `requiresDeveloperId` is true and no `developerId` was supplied.
 */
export const NavigationItem: React.FC<NavigationItemProps> = ({
  navigationLinkItem: { label, href, requiresDeveloperId },
  developerId,
}: NavigationItemProps) => {
  const pathname = usePathname();

  if (requiresDeveloperId && !developerId) {
    return null;
  }

  // Replace [developerId] with actual ID if available
  const resolvedHref = developerId
    ? href.replace("[developerId]", developerId)
    : href;

  // Determine if this link is active based on the current path
  const isActive =
    pathname === resolvedHref || pathname.startsWith(`${resolvedHref}/`);

  return (
    <Link href={resolvedHref} className="flex">
      <div
        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium group relative
           ${isActive ? "border-lime-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
      >
        {label}
      </div>
    </Link>
  );
};
