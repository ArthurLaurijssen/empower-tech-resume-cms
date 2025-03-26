import { z } from "zod";
import { ExperienceType } from "@/models/enums/ExperienceType";

const experienceTypeValues = Object.values(ExperienceType);

/**
 * Array of objects representing experience type options for form selection.
 */
export const experienceTypeOptions = experienceTypeValues.map((value) => ({
  value,
  label: value,
}));

/**
 * Zod schema for validating experience form data.
 */
export const experienceFormSchema = z
  .object({
    /** Type of experience (must be a valid ExperienceType) */
    experienceTypeName: z
      .string()
      .refine(
        (value) => experienceTypeValues.includes(value as ExperienceType),
        {
          message: "Please select a valid experience type",
        },
      ),

    /** Start date of the experience (must not be in the future) */
    startDate: z
      .date({
        required_error: "Please select a start date",
        invalid_type_error: "Please enter a valid date",
      })
      .refine((date) => date <= new Date(), {
        message: "Start date cannot be in the future",
      }),

    /** End date of the experience (optional, must not be in the future if provided) */
    endDate: z
      .date({
        invalid_type_error: "Please enter a valid date",
      })
      .nullable()
      .refine(
        (date) => !date || date <= new Date(),
        "End date cannot be in the future",
      ),

    /** Location name (2-100 characters) */
    locationName: z
      .string()
      .min(2, "Location name must be at least 2 characters long")
      .max(100, "Location name cannot exceed 100 characters"),

    /** Title of the experience (2-100 characters) */
    title: z
      .string()
      .min(2, "Title must be at least 2 characters long")
      .max(100, "Title cannot exceed 100 characters"),

    /** Description of the experience (10-1000 characters) */
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(1000, "Description cannot exceed 1000 characters"),
  })
  .superRefine((data, ctx) => {
    // Additional validation to ensure end date is after start date
    if (data.endDate && data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }
  });

/**
 * Type definition for the experience form data,
 * inferred from the Zod schema.
 */
export type ExperienceFormData = z.infer<typeof experienceFormSchema>;
