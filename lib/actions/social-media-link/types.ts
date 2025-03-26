import { z } from "zod";
import { SocialMediaNetwork } from "@/models/enums/SocialMediaNetwork";

// Get only the name keys from the enum, filtering out the numeric values
const socialNetworkKeys = Object.keys(SocialMediaNetwork).filter((key) =>
  isNaN(Number(key)),
);

/**
 * Zod schema for validating social media link form data.
 */
export const socialMediaLinkFormSchema = z.object({
  /** URL of the social media profile (5-2000 characters) */
  socialMediaUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(5, "URL must be at least 5 characters long")
    .max(2000, "URL cannot exceed 2000 characters"),

  /** Name of the social media network */
  socialMediaNetworkName: z.enum(socialNetworkKeys as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid social media network" }),
  }),
});

/**
 * Type definition for the social media link form data,
 * inferred from the Zod schema.
 */
export type SocialMediaLinkFormData = z.infer<typeof socialMediaLinkFormSchema>;

/**
 * Array of objects representing social media network options for form selection.
 */
export const SocialMediaNetworkOptions = socialNetworkKeys.map((name) => ({
  value: name,
  label: name,
}));
