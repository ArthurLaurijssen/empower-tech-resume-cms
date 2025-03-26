/**
 * BaseErrorHandler Component
 *
 * Transforms detailed error information into a user-friendly error page layout
 * Provides a consistent way to display different types of application errors
 */
import React from "react";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";
import { BaseErrorHandlerProps } from "@/components/ui/error/base-error/types";

export const BaseErrorHandler: React.FC<BaseErrorHandlerProps> = ({
  error,
  title,
}: BaseErrorHandlerProps) => {
  return (
    // Render standardized error page with extracted error details
    <ErrorPageLayout
      code={`${error.statusCode}`}
      title={title}
      description={error.message}
      reason={error.code}
    />
  );
};
