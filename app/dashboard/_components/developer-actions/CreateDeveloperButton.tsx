"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createDeveloperAction } from "@/lib/actions/developer/create-default/createDefaultDeveloper.server";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/buttons/button/button";

/**
 * A buttons component that creates a new default developer and navigates to their detail page.
 * The buttons are disabled if the user is not authenticated, is loading, or if a creation is already in progress.
 */
export const CreateDeveloperButton = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  /**
   * Handles the click event to create a new developer.
   * On success, it redirects to the newly created developer's page.
   * On failure, it shows a toast message.
   */
  const handleClick = async () => {
    try {
      // Start a transition for the async state update process
      startTransition(async () => {
        // Execute the creation developer action
        const result = await createDeveloperAction();

        // Check if the creation was successful
        if (result.success) {
          // Refresh the page data and navigate to the developer's page
          router.refresh();
          router.push(`/developer/${result.developerId}/profile`);
        } else {
          // Show a toast message if unsuccessful
          showToast(result.error || "Failed to create developer", "error");
        }
      });
    } catch (error) {
      // Catch any unexpected toast and display an toast message
      console.log(error);
      showToast(`Failed to create developer`, "error");
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      intent="primary"
    >
      {isPending ? "Creating..." : "Add default developer"}
    </Button>
  );
};
