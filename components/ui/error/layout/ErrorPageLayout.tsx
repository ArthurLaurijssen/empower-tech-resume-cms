import React from "react";
import Link from "next/link";
import { ErrorPageProps } from "./types";

/**
 * React component that provides a standardized header for error pages.
 *
 * HTML Structure:
 * - A container that uses Tailwind CSS utility classes to center content both vertically and horizontally.
 * - A large error code display, followed by a title and a description.
 * - If an ID and reason are provided, they are displayed for additional context.
 * - A link is included that takes the user back to the "View Developers" page.
 *
 * @param {ErrorPageProps} props The properties for rendering the error page header.
 * @returns A JSX element that displays an error page with the provided information.
 */
export const ErrorPageLayout: React.FC<ErrorPageProps> = ({
  code,
  title,
  description,
  id,
  reason,
}: ErrorPageProps) => {
  return (
    /**
     * This outer div creates a full-height grid to center items both horizontally and vertically.
     * The "place-items-center" class helps center its child elements.
     */
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      {/**
       * The inner container uses text-center alignment for readability.
       * It contains the error code, title, description, and additional navigation and support text.
       */}
      <div className="text-center">
        {/**
         * The error code is displayed in a large, highlighted font for immediate visibility.
         */}
        <p className="text-6xl font-semibold text-lime-600">{code}</p>

        {/**
         * The title provides a short summary of the error (e.g., "Developer Not Found").
         */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        {/**
         * The description gives the user more context. If an ID is present, it is included here,
         * and if a reason is provided, it's displayed below the description.
         */}
        <p className="mt-4 text-base leading-7 text-gray-600">
          {description}
          {id && <span className="font-medium"> ({id})</span>}
          {reason && <span className="block mt-2 text-sm">{reason}</span>}
        </p>

        {/**
         * A link back to the main developers page to help users recover from the error scenario.
         */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-semibold text-gray-900 hover:text-lime-600"
          >
            View Developers <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/**
         * A small note guiding the user to contact support if they believe the error is a mistake.
         */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is a mistake or need assistance, please contact
          support.
        </p>
      </div>
    </div>
  );
};
