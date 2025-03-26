/**
 * Loader Component
 *
 * A simple, reusable loading spinner component with customizable text.
 * Features:
 * - Animated spinning border design
 * - Customizable loading text
 * - Centered header with consistent spacing
 * - Tailwind CSS styling
 *
 * @module Loader
 */

import { LoaderProps } from "@/components/ui/loader/types";
import React from "react";

/**
 * Loader Component
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} [props.text="Loading..."] - Text to display next to the spinner
 *
 * @example
 * // Basic usage with default "Loading..." text
 * <Loader />
 *
 * @example
 * // Custom loading text
 * <Loader text="Please wait..." />
 */
const Loader: React.FC<LoaderProps> = ({
  text = "Loading...", // Default loading text
}: LoaderProps) => {
  return (
    // Container with centered header
    <div className="flex items-center justify-center">
      {/* Spinner container with animation */}
      <div className="h-8 w-8 animate-spin">
        {/* Spinning border circle */}
        <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-gray-400"></div>
      </div>
      {/* Loading text with consistent spacing and styling */}
      <span className="ml-2 text-sm text-gray-500">{text}</span>
    </div>
  );
};

export default Loader;
