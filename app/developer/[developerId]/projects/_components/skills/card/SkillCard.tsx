/**
 * SkillCard Component
 *
 * Renders a comprehensive view of a skill, including its header
 * and associated projects with management capabilities
 */
import React from "react";
import { SkillAndProjectsProps } from "@/app/developer/[developerId]/projects/_components/skills/card/types";
import { SkillCardHeader } from "@/app/developer/[developerId]/projects/_components/skills/card/layout/SkillCardHeader";
import { ProjectsHeader } from "@/app/developer/[developerId]/projects/_components/projects/header/ProjectsHeader";
import { ProjectsList } from "@/app/developer/[developerId]/projects/_components/projects/list/ProjectsList";

export const SkillCard: React.FC<SkillAndProjectsProps> = ({
  skill,
  developerId,
  onEditSkill,
}: SkillAndProjectsProps) => {
  return (
    <>
      {/* Skill card header with edit capabilities */}
      <SkillCardHeader
        skill={skill}
        developerId={developerId}
        onEditSkill={onEditSkill}
      ></SkillCardHeader>

      {/* Projects header with add project functionality */}
      <ProjectsHeader
        key={skill.id}
        skillId={skill.id}
        developerId={developerId}
      ></ProjectsHeader>

      {/* List of projects associated with this skill */}
      <ProjectsList
        projects={skill.projects}
        developerId={developerId}
        skillId={skill.id}
      ></ProjectsList>
    </>
  );
};
