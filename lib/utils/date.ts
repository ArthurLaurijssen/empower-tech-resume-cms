import { InputValue } from "@/components/ui/forms/types";

export const formatInputValue = (
  value: InputValue | undefined,
  type: string,
): string | number => {
  if (value === undefined || value === null) return "";

  // Handle number inputs
  if (type === "number") {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const num = parseFloat(value);
      return isNaN(num) ? "" : num;
    }
    return "";
  }

  // Handle date inputs
  if (type === "date") {
    if (typeof value === "string") {
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }
      // Otherwise, try to parse it (handles ISO strings)
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split("T")[0];
      } catch {
        return "";
      }
    }
    if (value instanceof Date) {
      return value.toISOString().split("T")[0];
    }
    return "";
  }

  // Default string handling for other types
  return String(value);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
