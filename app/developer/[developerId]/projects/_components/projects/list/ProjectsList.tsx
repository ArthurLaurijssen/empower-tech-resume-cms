/**
 * ProjectsList Component
 *
 * Renders a dynamic list of projects with inline editing capabilities
 * Provides a seamless interface for viewing and modifying project details
 */
"use client";

import React, { useState } from "react";
import { ProjectsProps } from "@/app/developer/[developerId]/projects/_components/projects/list/types";
import { EditProjectForm } from "@/app/developer/[developerId]/projects/_components/projects/edit/EditProjectForm";
import { ProjectCard } from "@/app/developer/[developerId]/projects/_components/projects/card/ProjectCard";

export const ProjectsList: React.FC<ProjectsProps> = ({
  projects,
  skillId,
  developerId,
}: ProjectsProps) => {
  // State to track which project is currently being edited
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  return projects.map((project) => (
    // Consistent styling for each project container
    <div key={project.id} className="rounded border border-gray-200 p-4 mt-3">
      {/* Conditional rendering between view and edit modes */}
      {editingProjectId === project.id ? (
        // Edit form appears when project is in editing state
        <EditProjectForm
          project={project}
          developerId={developerId}
          skillId={skillId}
          onCancel={() => setEditingProjectId(null)}
        ></EditProjectForm>
      ) : (
        // Project card shows default view with edit option
        <ProjectCard
          project={project}
          developerId={developerId}
          skillId={skillId}
          onEditProject={() => setEditingProjectId(project.id)}
        ></ProjectCard>
      )}
    </div>
  ));
};
