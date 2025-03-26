import React from "react";
import { ProgressBarIntent, ProgressBarProps } from "./types";

/**
 * Get the CSS classes for the progress bar based on the intent
 * @param intent - The visual style intent of the progress bar
 * @returns A string of CSS classes
 */
const getProgressStyles = (intent: ProgressBarIntent): string => {
  const baseStyles = " h-2 rounded";

  const styles = {
    primary: "bg-lime-500",
    danger: "bg-red-600",
  };

  return `${baseStyles} ${styles[intent]}`;
};

/**
 * ProgressBar component
 * Renders a customizable progress bar
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  intent,
  progress,
  className,
  customClass,
}) => {
  // Determine whether to use a wrapper div or React.Fragment
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Background of the progress bar */}
      <div className="w-full bg-gray-200 rounded h-2 mt-2">
        {/* Actual progress bar */}
        <div
          className={`${getProgressStyles(intent)} ${customClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </Wrapper>
  );
};
