"use client";

import React, { useState } from "react";
import { ExperienceListProps } from "@/app/developer/[developerId]/experiences/_components/experience/list/types";
import { EditExperienceForm } from "@/app/developer/[developerId]/experiences/_components/experience/edit/EditExperienceForm";
import { ExperienceCard } from "@/app/developer/[developerId]/experiences/_components/experience/card/ExperienceCard";

/**
 * ExperienceList renders a collection of experience entries with built-in editing capabilities.
 * The component manages the state of which experience is currently being edited and seamlessly
 * switches between display and edit modes for each experience entry.
 *
 * This component implements an inline editing pattern, where the edit form replaces the display
 * view directly in the list, providing a smooth and intuitive user experience. Only one
 * experience can be edited at a time, and the editing state is managed through the
 * editingExperienceId state variable.
 *
 * @param experiences - An array of experience objects to be displayed
 * @param developerId - The ID of the developer whose experiences are being shown
 */
export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
  developerId,
}: ExperienceListProps) => {
  // Track which experience is currently being edited using its ID
  // null indicates no experience is being edited
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null,
  );

  return experiences.map((experience) => (
    // Each experience is wrapped in a container with consistent styling
    // The key prop ensures React can efficiently update the list
    <div
      key={experience.id}
      className="rounded border border-gray-200 p-4 mt-3"
    >
      {/* Conditional rendering based on whether this experience is being edited */}
      {editingExperienceId === experience.id ? (
        // Edit mode: Display the edit form for this experience
        // The onCancel prop allows the form to exit edit mode
        <EditExperienceForm
          experience={experience}
          developerId={developerId}
          onCancel={() => setEditingExperienceId(null)}
        />
      ) : (
        // Display mode: Show the experience card with its content
        // The onEditExperience prop enables entering edit mode for this experience
        <ExperienceCard
          experience={experience}
          developerId={developerId}
          onEditExperience={() => setEditingExperienceId(experience.id)}
        />
      )}
    </div>
  ));
};
