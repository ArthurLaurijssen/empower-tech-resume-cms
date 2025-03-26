// Defines the possible visual styles for the progress bar
export type ProgressBarIntent = "primary" | "danger";

// Interface for the props of the ProgressBar component
export interface ProgressBarProps {
  // The visual style of the progress bar
  intent: ProgressBarIntent;

  // The current progress value (0-100)
  progress: number;

  // Optional CSS class for the wrapper element
  className?: string;

  // Optional custom CSS class for the progress bar itself
  customClass?: string;
}
