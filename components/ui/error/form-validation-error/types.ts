import { ZodIssue } from "zod";

export interface FormValidationErrorMessagesProps {
  className?: string;
  errors: ZodIssue[];
}
