/**
 * Header component for Projects and Skills page
 *
 * Provides a structured header with a title, subtitle, and an action button
 * to add new skills or projects to the developer's profile
 */
import { AddSkillModalButton } from "@/app/developer/[developerId]/projects/_components/skills/add/AddSkillModalButton";
import React from "react";
import { ProjectsAndSkillsHeaderProps } from "@/app/developer/[developerId]/projects/_components/header/types";

export const ProjectsAndSkillsPageHeader: React.FC<
  ProjectsAndSkillsHeaderProps
> = ({ developerId }: ProjectsAndSkillsHeaderProps) => {
  return (
    // Flexbox layout to distribute header content horizontally
    <div className="flex justify-between">
      {/* Informative text section */}
      <div>
        <h1 className="text-base font-semibold text-gray-900">Skills</h1>
        <p className="mt-2 text-sm text-gray-700">
          Add a project or skill to your profile
        </p>
      </div>
      {/* Action button to open skill/project modal */}
      <div>
        <AddSkillModalButton developerId={developerId} />
      </div>
    </div>
  );
};
