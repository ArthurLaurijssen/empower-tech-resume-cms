/**
 * Represents the structure of experience form data.
 */
export interface ExperienceFormData {
  /** The type of experience. */
  experienceTypeName: string;
  /** The start date of the experience. */
  startDate: Date;
  /** The end date of the experience (nullable). */
  endDate: Date | null;
  /** The location of the experience. */
  locationName: string;
  /** The title of the experience. */
  title: string;
  /** The description of the experience. */
  description: string;
}

/**
 * Transforms form data into an ExperienceFormData object.
 * @param formData - The form data to transform.
 * @returns An object of type ExperienceFormData with the transformed data.
 */
export function transformExperienceFormData(
  formData: FormData,
): ExperienceFormData {
  return {
    // Retrieve the "experienceType" field value, convert to string, or use an empty string as fallback
    experienceTypeName: formData.get("experienceType")?.toString() || "",

    // Retrieve the "startDate" field value, convert to string, create a new Date object, or use an invalid date as fallback
    startDate: new Date(formData.get("startDate")?.toString() || ""),

    // Retrieve the "endDate" field value, convert to string, create a new Date object if exists, or use null as fallback
    endDate: formData.get("endDate")?.toString()
      ? new Date(formData.get("endDate")!.toString())
      : null,

    // Retrieve the "locationName" field value, convert to string, or use an empty string as fallback
    locationName: formData.get("locationName")?.toString() || "",

    // Retrieve the "title" field value, convert to string, or use an empty string as fallback
    title: formData.get("title")?.toString() || "",

    // Retrieve the "description" field value, convert to string, or use an empty string as fallback
    description: formData.get("description")?.toString() || "",
  };
}
