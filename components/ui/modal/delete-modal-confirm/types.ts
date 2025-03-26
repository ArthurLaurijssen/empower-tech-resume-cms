/**
 * Defines the properties required by the ErrorPageLayout component.
 */
export interface DeleteModalConfirmProps {
  /**
   * A boolean indicating whether the modal is currently open.
   * If `false`, the modal will not be rendered.
   */
  isOpen: boolean;

  /**
   * A callback function to be called when the user closes the modal without confirming.
   */
  onClose: () => void;

  /**
   * A callback function to be called when the user confirms the deletion action.
   */
  onConfirm: () => void;

  /**
   * The title text displayed at the top of the modal.
   */
  title: string;

  /**
   * A descriptive message explaining what is being deleted or the consequences of the action.
   */
  description: string;

  /**
   * The text to display on the confirm (red) buttons.
   * Defaults to "Deactivate" if not provided.
   */
  confirmButtonText?: string;

  /**
   * The text to display on the cancel (gray) buttons.
   * Defaults to "Cancel" if not provided.
   */
  cancelButtonText?: string;

  /**
   * Indicates whether the confirm buttons should show a loading state.
   * If `true`, the confirm buttons is disabled and shows "Processing...".
   */
  isLoading?: boolean;
}
