import { Developer } from "@/models/entities/Developer";
import React from "react";

/**
 * Properties for the developer profile form
 */
export interface DeveloperProfileFormProps {
  /** Developer profile data */
  developer: Developer;
}

/**
 * Extends developer profile props to include child components
 */
export interface ClientFormWrapperDeveloperProfileProps
  extends DeveloperProfileFormProps {
  /** Form content to be rendered */
  children: React.ReactNode;
}
