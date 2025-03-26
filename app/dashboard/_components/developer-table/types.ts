import { Developer } from "@/models/entities/Developer";

/**
 * Properties for the DeveloperTableRow component.
 */
export interface DeveloperTableRowProps {
  /** The developer object containing id, name, email, and other attributes. */
  developer: Developer;
}

/**
 * Properties for the DevelopersTable component.
 */
export interface DevelopersTableProps {
  /** An array of developers to be listed in the table. */
  developers: Developer[];
}
