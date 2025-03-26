import { Developer } from "@/models/entities/Developer";
import Link from "next/link";
import React from "react";
import { DeveloperTableRowProps } from "@/app/dashboard/_components/developer-table/types";
import { DeleteDeveloperButton } from "@/app/dashboard/_components/developer-actions/DeleteDeveloperButton";

/**
 * Represents a single row in the developers table.
 * Each row displays a developer's ID, name, email, and provides links to edit or delete the developer.
 *
 * @param props The properties containing the developer data to display.
 */
export const DeveloperTableRow: React.FC<DeveloperTableRowProps> = ({
  developer,
}: {
  developer: Developer;
}) => {
  return (
    <tr>
      {/* Developer's ID */}
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 hidden md:table-cell">
        {developer.id}
      </td>

      {/* Developer's Name (hidden on small screens) */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:block">
        {developer.name}
      </td>

      {/* Developer's Email */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {developer.email}
      </td>

      {/* Action buttons: Edit and Delete */}
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Link
          href={`/developer/${developer.id}/profile`}
          className="text-lime-600 hover:text-lime-900"
        >
          Edit
          <span className="sr-only">, {developer.name}</span>
        </Link>
        <DeleteDeveloperButton
          developerId={developer.id}
          developerName={developer.name}
        />
      </td>
    </tr>
  );
};
