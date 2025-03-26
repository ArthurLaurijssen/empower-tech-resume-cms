import { DevelopersTableProps } from "@/app/dashboard/_components/developer-table/types";
import React from "react";
import { DeveloperTableRow } from "@/app/dashboard/_components/developer-table/DeveloperTableRow";

/**
 * A table component that displays a list of developers with columns for ID, Name, and Email.
 * Each row includes controls to edit or delete a developer.
 *
 * @param props The properties containing an array of developers to display.
 */
export const DevelopersTable: React.FC<DevelopersTableProps> = ({
  developers,
}: DevelopersTableProps) => {
  const hasNoDevelopers = developers.length === 0;
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {/* The main developers table */}
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {/* Column headers */}
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 hidden md:table-cell"
                >
                  Developer ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:block"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Map through developers and create a table row for each */}
              {hasNoDevelopers ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-8 text-center text-sm text-gray-500"
                  >
                    <p className="mb-2">
                      You don&#39;t have any developer resumes yet
                    </p>
                    <p className="text-lime-600 font-medium">
                      Create one using add default developer
                    </p>
                  </td>
                </tr>
              ) : (
                developers.map((developer) => (
                  <DeveloperTableRow key={developer.id} developer={developer} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
