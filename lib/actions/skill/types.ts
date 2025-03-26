import { z } from "zod";

/**
 * Zod schema for validating skill form data.
 */
export const skillFormSchema = z.object({
  /** Name of the skill (2-50 characters) */
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters long")
    .max(50, "Skill name cannot exceed 50 characters"),

  /** Proficiency level of the skill (-1-100) */
  proficiencyLevel: z
    .number()
    .int()
    .min(
      -1,
      "Proficiency level must be at least -1 and at most 100. with -1 being no rating",
    )
    .max(100, "Proficiency level cannot exceed 100"),
});

/**
 * Type definition for the skill form data,
 * inferred from the Zod schema.
 */
export type SkillFormData = z.infer<typeof skillFormSchema>;
