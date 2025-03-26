import { z } from "zod";

/**
 * Zod schema for validating developer profile form data.
 */
export const developerProfileFormSchema = z.object({
  /** Developer's name (2-50 characters) */
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  /** Developer's email address */
  email: z.string().email("Please enter a valid email address"),

  /** Title for the developer's greeting (2-50 characters) */
  greetingTitle: z
    .string()
    .min(2, "Greeting title must be at least 2 characters long")
    .max(50, "Greeting title cannot exceed 50 characters"),

  /** Developer's greeting message (2-350 characters) */
  greetingMessage: z
    .string()
    .min(2, "Greeting message must be at least 2 characters long")
    .max(350, "Greeting message cannot exceed 350 characters"),

  /** Title for the developer's mission statement (2-50 characters) */
  missionTitle: z
    .string()
    .min(2, "Mission title must be at least 2 characters long")
    .max(50, "Mission title cannot exceed 50 characters"),

  /** Developer's mission description (2-350 characters) */
  missionDescription: z
    .string()
    .min(2, "Mission description must be at least 2 characters long")
    .max(350, "Mission description cannot exceed 350 characters"),

  /** Date when the developer started in IT */
  itExperienceStartDate: z.date({
    required_error: "Please select when you started in IT",
    invalid_type_error: "Please enter a valid date",
  }),

  /** Date when the developer started working (must not be in the future) */
  workExperienceStartDate: z
    .date({
      required_error: "Please select when you started working",
      invalid_type_error: "Please enter a valid date",
    })
    .refine((date) => date <= new Date(), {
      message: "Work experience start date cannot be in the future",
    }),
});

/**
 * Type definition for the developer profile form data,
 * inferred from the Zod schema.
 */
export type DeveloperProfileFormData = z.infer<
  typeof developerProfileFormSchema
>;
