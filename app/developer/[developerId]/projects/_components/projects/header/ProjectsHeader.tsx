/**
 * ProjectsHeader Component
 *
 * Renders a header section for a skill's project collection
 * Provides a clear title and a mechanism to add new projects
 */
import React from "react";
import { ProjectsHeaderProps } from "@/app/developer/[developerId]/projects/_components/projects/header/types";
import { AddProjectModalButton } from "@/app/developer/[developerId]/projects/_components/projects/add/AddProjectModalButton";

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  skillId,
  developerId,
}: ProjectsHeaderProps) => {
  return (
    // Flexible layout distributing title and action button
    <div className="flex justify-between mt-4">
      {/* Section title with prominence */}
      <h2 className="text-xl text-semibold">Projects</h2>

      {/* Button to add new projects within this skill context */}
      <AddProjectModalButton
        skillId={skillId}
        developerId={developerId}
      ></AddProjectModalButton>
    </div>
  );
};
