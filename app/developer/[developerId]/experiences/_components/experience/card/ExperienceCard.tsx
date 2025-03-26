import React from "react";
import { EditIcon } from "@/components/icons/edit-icon/EditIcon";
import { ExperienceCardProps } from "@/app/developer/[developerId]/experiences/_components/experience/card/types";
import { DeleteExperience } from "@/app/developer/[developerId]/experiences/_components/experience/delete/DeleteExperience";
import { DateIcon } from "@/components/icons/date-icon/DateIcon";
import { LocationIcon } from "@/components/icons/location-icon/LocationIcon";
import { formatDate } from "@/lib/utils/date";

/**
 * ExperienceCard displays a single experience entry for a developer's profile.
 * It shows the experience title, duration, location, and description with edit/delete capabilities.
 *
 * @param experience - The experience data to display
 * @param developerId - The ID of the developer this experience belongs to
 * @param onEditExperience - Callback function triggered when the edit button is clicked
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  developerId,
  onEditExperience,
}: ExperienceCardProps) => {
  // Handle cases where the experience is ongoing (no end date)
  const endDate = experience.endDate
    ? formatDate(experience.endDate)
    : "present";

  return (
    <div>
      {/* Header section with title and action buttons */}
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-2">{experience.title}</h1>
        <div className="flex">
          {/* Edit button with hover effect */}
          <EditIcon
            size={24}
            onClick={onEditExperience}
            className="text-gray-600 hover:text-lime-600 me-2"
          />
          {/* Delete experience button with custom styling */}
          <DeleteExperience
            experience={experience}
            developerId={developerId}
            className="text-gray-600 hover:text-red-700"
            size={24}
          />
        </div>
      </div>

      {/* Date range and location information */}
      <div className="flex items-center my-2 text-gray-900 text-md">
        {/* Date range display with icon */}
        <div className="flex items-center me-5">
          <DateIcon className="me-2" />
          <span className="me-2">{formatDate(experience.startDate)}</span>
          <span>- {endDate}</span>
        </div>
        {/* Location display with icon */}
        <div className="flex items-center">
          <LocationIcon className="me-2" />
          <div>{experience.locationName}</div>
        </div>
      </div>

      {/* Experience description */}
      <p className="text-md text-gray-600 mt-3">{experience.description}</p>
    </div>
  );
};
