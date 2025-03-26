import React from "react";

/**
 * A page component rendered when a user tries to access a resource or page without proper authorization.
 *
 * This component displays a "403 Not Authorized" message, along with guidance to contact an administrator for access.
 * It uses a full-page header with a visually centered message.
 *
 * @returns A JSX element representing the unauthorized access page.
 */
const UnauthorizedPage: React.FC = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Status code indicating "Forbidden" */}
        <p className="text-base font-semibold text-lime-600">403</p>

        {/* Primary heading for the unauthorized message */}
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Not Authorized
        </h1>

        {/* Additional information guiding the user to contact an administrator */}
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, please contact an administrator to get access to this website
        </p>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
