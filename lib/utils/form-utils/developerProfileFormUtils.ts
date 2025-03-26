/**
 * Interface representing the structure of developer profile form data.
 */
export interface DeveloperProfileFormData {
  /** The name of the developer */
  name: string;
  /** The email address of the developer */
  email: string;
  /** The title for the developer's greeting */
  greetingTitle: string;
  /** The greeting message from the developer */
  greetingMessage: string;
  /** The title for the developer's mission statement */
  missionTitle: string;
  /** The description of the developer's mission */
  missionDescription: string;
  /** The date when the developer started working in IT */
  itExperienceStartDate: Date;
  /** The date when the developer started their professional career */
  workExperienceStartDate: Date;
}

/**
 * Transforms raw form data into a structured DeveloperProfileFormData object.
 * @param formData - The raw form data to transform
 * @returns A DeveloperProfileFormData object
 */
export function transformDeveloperProfileFormData(
  formData: FormData,
): DeveloperProfileFormData {
  return {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    greetingTitle: formData.get("greetingTitle")?.toString() || "",
    greetingMessage: formData.get("greetingMessage")?.toString() || "",
    missionTitle: formData.get("missionTitle")?.toString() || "",
    missionDescription: formData.get("missionDescription")?.toString() || "",
    itExperienceStartDate: new Date(
      formData.get("itExperienceStartDate")?.toString() || "",
    ),
    workExperienceStartDate: new Date(
      formData.get("workExperienceStartDate")?.toString() || "",
    ),
  };
}
