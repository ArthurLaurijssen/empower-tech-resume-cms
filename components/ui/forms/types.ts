import React from "react";

export type InputValue = string | number | Date;

export type InputType =
  | "text"
  | "number"
  | "date"
  | "email"
  | "password"
  | "tel";

export interface BaseInputProps {
  id: string;
  label?: string;
  className?: string;
}

export interface InputProps extends BaseInputProps {
  type: InputType;
  defaultValue?: InputValue;
}

export interface TextAreaProps extends BaseInputProps {
  description?: string;
  rows?: number;
  defaultValue?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps extends BaseInputProps {
  options: SelectOption[];
  defaultValue?: string;
  required?: boolean;
}

export interface ImageDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  allowMultiple?: boolean;
  id: string;
}

export interface FormSectionProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
}
