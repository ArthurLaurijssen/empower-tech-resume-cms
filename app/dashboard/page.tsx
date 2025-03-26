/**
 * Home Dashboard Page Component
 *
 * A Next.js page component that serves as the main dashboard, displaying
 * a list of developers with comprehensive error handling for authentication
 * and authorization scenarios.
 *
 * @module Home
 */
export const dynamic = "force-dynamic";
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DevelopersTable } from "@/app/dashboard/_components/developer-table/DevelopersTable";
import { DevelopersHeader } from "@/app/dashboard/_components/header/developers-header";
import { DevelopersServiceTs } from "@/lib/services/developer/DevelopersService.ts";
import { BaseError } from "@/lib/types/errors/BaseError";
import { BaseErrorHandler } from "@/components/ui/error/base-error/BaseErrorHandler";
import { ErrorPageLayout } from "@/components/ui/error/layout/ErrorPageLayout";

/**
 * Home Dashboard Page
 *
 * Renders the main dashboard with a table of developers and appropriate error
 * states for various failure scenarios. Features:
 * - Developer listing in table format
 * - Authentication checking
 * - Authorization validation
 * - Comprehensive error handling
 *
 * Error Handling:
 * - NoTokenError: Displays authentication required message
 * - NotAuthorizedError: Shows unauthorized access message
 * - Unexpected errors: Shows generic error message
 *
 * @component
 * @async
 *
 * @throws {NoTokenError} When authentication token is missing
 *
 * @example
 */

export default async function Dashboard() {
  try {
    // Fetch all developers from the service
    const developers = await DevelopersServiceTs.getAllDevelopers();

    // Render successful state with developers table
    return (
      <PageLayout title="Dashboard">
        <DevelopersHeader />
        <DevelopersTable developers={developers} />
      </PageLayout>
    );
  } catch (error) {
    //Log error to console
    console.error("Error fetching developers", error);
    //Handle error
    if (error instanceof BaseError) {
      //return error message
      return (
        <BaseErrorHandler
          error={error}
          title="Something went wrong trying to fetch developers"
        ></BaseErrorHandler>
      );
    }
    return (
      //Unexpected error message
      <ErrorPageLayout
        code="500"
        title="Unexpected Error"
        description="An unexpected error occurred"
        reason="Unknown"
      />
    );
  }
}
