/**
 * ProjectCard Component
 *
 * Renders an individual project card with title, description,
 * and interactive edit/delete actions. Designed to provide
 * a compact, user-friendly display of project details within
 * a developer's skill portfolio.
 */
import React from "react";
import { EditIcon } from "@/components/icons/edit-icon/EditIcon";
import { DeleteProject } from "@/app/developer/[developerId]/projects/_components/projects/delete/DeleteProject";
import { ProjectProps } from "@/app/developer/[developerId]/projects/_components/projects/card/types";

export const ProjectCard: React.FC<ProjectProps> = ({
  project,
  skillId,
  developerId,
  onEditProject,
}: ProjectProps) => {
  return (
    // Flexible layout dividing project details and actions
    <div className="flex justify-between">
      {/* Project information section */}
      <div>
        {/* Project title with medium font weight */}
        <h1 className="font-medium">{project.title}</h1>

        {/* Project description with text wrapping and soft color */}
        <p className="text-gray-600 break-words whitespace-normal">
          {project.description}
        </p>
      </div>

      {/* Action buttons for editing and deleting project */}
      <div className="flex">
        {/* Edit icon with interactive hover state */}
        <EditIcon
          size={24}
          onClick={onEditProject}
          className="text-gray-600 hover:text-lime-600 me-2"
        ></EditIcon>

        {/* Delete project component with contextual information */}
        <DeleteProject
          project={project}
          developerId={developerId}
          skillId={skillId}
          className="text-gray-600 hover:text-red-700"
          size={24}
        ></DeleteProject>
      </div>
    </div>
  );
};
