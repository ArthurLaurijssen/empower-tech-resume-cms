import { CreateDeveloperButton } from "../developer-actions/CreateDeveloperButton";

/**
 * A header component for the developers page.
 * Displays a title, description, and a buttons to create a new developer.
 */
export const DevelopersHeader = () => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold text-gray-900">Developers</h1>
        <p className="mt-2 text-sm text-gray-700">
          Select a developer to edit their resume
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        {/* The create developer buttons is rendered here */}
        <CreateDeveloperButton />
      </div>
    </div>
  );
};
