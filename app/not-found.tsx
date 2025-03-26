/**
 * 404 Not Found Page Component
 *
 * A responsive error page that displays when a requested route is not found.
 * Features a clean, centered header with helpful navigation options and
 * support information.
 *
 * @module NotFound
 */

import Link from "next/link";

/**
 * NotFound Component
 *
 * Displays a user-friendly 404 error page with:
 * - Large, visible 404 status code
 * - Clear error message
 * - Helpful description
 * - Navigation link back to home
 * - Support information
 *
 * Features responsive design and maintains accessibility standards.
 *
 * @component
 *
 * @example
 * // This component is automatically rendered by Next.js
 * // when a route is not found
 */
export default function NotFound() {
  return (
    // Main container with responsive padding and centered content
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Large 404 display with brand color */}
        <p className="text-6xl font-semibold text-lime-600">404</p>

        {/* Clear error message */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          Sorry, we couldn&#39;t find this page
        </h2>

        {/* Descriptive text explaining the situation */}
        <p className="mt-4 text-base leading-7 text-gray-600">
          The page you&#39;re looking for doesn&#39;t exist or may have been
          moved. Not to worry - you can find your way back to our main page
          below.
        </p>

        {/* Navigation link with hover state */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-semibold text-gray-900 hover:text-lime-600"
          >
            View Developers <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Support information */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is a mistake or need assistance, please contact
          support.
        </p>
      </div>
    </div>
  );
}
