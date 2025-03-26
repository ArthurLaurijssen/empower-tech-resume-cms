/**
 * Represents the structure of skill form data.
 */
export interface SkillFormData {
  /** The name of the skill. */
  name: string;
  /** The proficiency level of the skill. */
  proficiencyLevel: number;
}

/**
 * Transforms form data into a SkillFormData object.
 * @param formData - The form data to transform.
 * @returns An object of type SkillFormData with the transformed data.
 */
export function transformSkillFormData(formData: FormData): SkillFormData {
  return {
    // Retrieve the "name" field value, convert to string, or use an empty string as fallback
    name: formData.get("name")?.toString() || "",

    // Retrieve the "proficiencyLevel" field value, convert to number, or use 0 as fallback
    proficiencyLevel: Number(formData.get("proficiencyLevel")?.toString() || 0),
  };
}
