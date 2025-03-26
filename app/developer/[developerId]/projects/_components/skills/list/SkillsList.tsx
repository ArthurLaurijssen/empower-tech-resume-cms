/**
 * SkillsList Component
 *
 * Renders a dynamic list of skills with inline editing capabilities
 * Provides a seamless interface for viewing and modifying skill details
 */
"use client";

import React, { useState } from "react";
import { SkillsAndProjectsProps } from "@/app/developer/[developerId]/projects/_components/skills/list/types";
import { SkillCard } from "@/app/developer/[developerId]/projects/_components/skills/card/SkillCard";
import { EditSkillForm } from "@/app/developer/[developerId]/projects/_components/skills/edit/EditSkillForm";

export const SkillsList: React.FC<SkillsAndProjectsProps> = ({
  skills,
  developerId,
}: SkillsAndProjectsProps) => {
  // State to track which skill is currently being edited
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  return (
    <>
      {skills.map((skill) => (
        // Consistent styling for each skill container
        <div key={skill.id} className="border border-gray-200 rounded mt-4 p-4">
          {/* Conditional rendering between view and edit modes */}
          {editingSkillId === skill.id ? (
            // Edit form appears when skill is in editing state
            <EditSkillForm
              skill={skill}
              developerId={developerId}
              onCancel={() => setEditingSkillId(null)}
            ></EditSkillForm>
          ) : (
            // Skill card shows default view with edit option
            <SkillCard
              skill={skill}
              developerId={developerId}
              onEditSkill={() => setEditingSkillId(skill.id)}
            ></SkillCard>
          )}
        </div>
      ))}
    </>
  );
};
