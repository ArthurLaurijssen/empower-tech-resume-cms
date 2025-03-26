/**
 * CloseButton Component
 *
 * Renders a responsive close button with accessibility and styling considerations
 * Only visible on small screens and above
 */
import React from "react";
import { CloseButtonProps } from "@/components/ui/buttons/close-button/types";

export const CloseButton: React.FC<CloseButtonProps> = ({ ...props }) => {
  return (
    // Positioned absolutely, hidden on mobile, visible on small screens
    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
      <button
        type="button"
        // Styling for focus, hover, and accessibility
        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        {...props}
      >
        {/* Screen reader text for accessibility */}
        <span className="sr-only">Close</span>

        {/* Close icon as an SVG */}
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          {/* X shape path for close icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
