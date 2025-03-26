/**
 * Represents the structure of project form data.
 */
export interface ProjectFormData {
  /** The title of the project. */
  title: string;
  /** The description of the project. */
  description: string;
}

/**
 * Transforms form data into a ProjectFormData object.
 * @param formData - The form data to transform.
 * @returns An object of type ProjectFormData with the transformed data.
 */
export function transformProjectFormData(formData: FormData): ProjectFormData {
  return {
    // Retrieve the "title" field value, convert to string, or use an empty string as fallback
    title: formData.get("title")?.toString() || "",

    // Retrieve the "description" field value, convert to string, or use an empty string as fallback
    description: formData.get("description")?.toString() || "",
  };
}
