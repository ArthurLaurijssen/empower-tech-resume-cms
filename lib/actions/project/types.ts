import { z } from "zod";

/**
 * Zod schema for validating project form data.
 */
export const projectFormSchema = z.object({
  /** Project title (2-50 characters) */
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .max(50, "Title cannot exceed 50 characters"),

  /** Project description (2-500 characters) */
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long")
    .max(500, "Description cannot exceed 500 characters"),
});

/**
 * Type definition for the project form data,
 * inferred from the Zod schema.
 */
export type ProjectFormData = z.infer<typeof projectFormSchema>;
