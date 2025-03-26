/**
 * SkillCardHeader Component
 *
 * Renders a comprehensive header for a skill card, displaying
 * technology name, proficiency level, and management actions
 */
import React from "react";
import { ProgressBar } from "@/components/ui/progress-bar/ProgressBar";
import { DeleteSkill } from "@/app/developer/[developerId]/projects/_components/skills/delete/DeleteSkill";
import { SkillHeaderProps } from "@/app/developer/[developerId]/projects/_components/skills/card/layout/types";
import { EditIcon } from "@/components/icons/edit-icon/EditIcon";

export const SkillCardHeader: React.FC<SkillHeaderProps> = ({
  skill,
  onEditSkill,
  developerId,
}: SkillHeaderProps) => {
  return (
    // Flexible layout distributing skill info and actions
    <div className="flex justify-between">
      {/* Skill details section */}
      <div>
        {/* Skill technology name */}
        <h1 className="text-base font-semibold">{skill.technologyName}</h1>

        {/* Proficiency progress bar */}
        {skill.proficiencyLevel === -1 ? (
          <p className="text-sm text-gray-600">No rating</p>
        ) : (
          <>
            <ProgressBar
              progress={skill.proficiencyLevel}
              intent="primary"
            ></ProgressBar>{" "}
            {/* Proficiency percentage */}
            <span className="text-sm text-gray-600">
              {skill.proficiencyLevel}%
            </span>
          </>
        )}
      </div>

      {/* Action buttons for skill management */}
      <div className="flex">
        {/* Edit skill icon */}
        <EditIcon
          onClick={onEditSkill}
          size={26}
          className="text-gray-600 hover:text-lime-600 me-2"
        ></EditIcon>

        {/* Delete skill component */}
        <DeleteSkill
          skill={skill}
          developerId={developerId}
          className="text-gray-600 hover:text-red-700"
          size={26}
        ></DeleteSkill>
      </div>
    </div>
  );
};
