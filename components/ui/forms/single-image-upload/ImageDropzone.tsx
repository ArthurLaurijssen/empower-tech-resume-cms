"use client";

/**
 * Image Dropzone Component
 *
 * A React component that provides a drag-and-drop interface for image uploads.
 * Features:
 * - Drag and drop file upload
 * - Click to select files
 * - Visual feedback during drag operations
 * - Configurable for single or multiple file uploads
 * - Accessible interface with ARIA attributes
 *
 * @module ImageDropzone
 */

import React from "react";
import { ImageDropzoneProps } from "@/components/ui/forms/types";

/**
 * ImageDropzone Component
 *
 * @component
 * @param {Object} props - Component properties
 * @param {(files: File[]) => void} props.onFilesSelected - Callback function triggered when files are selected
 * @param {boolean} [props.allowMultiple=true] - Whether to allow multiple file selection
 * @param {string} props.id - Unique identifier for the file input
 *
 * @example
 * // Single file upload
 * <ImageDropzone
 *   onFilesSelected={(files) => handleFiles(files)}
 *   allowMultiple={false}
 *   id="profile-image"
 * />
 *
 * @example
 * // Multiple file upload
 * <ImageDropzone
 *   onFilesSelected={(files) => handleFiles(files)}
 *   id="gallery-images"
 * />
 */
export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFilesSelected,
  allowMultiple = true,
  id,
}: ImageDropzoneProps) => {
  // State for tracking drag operation
  const [isDragging, setIsDragging] = React.useState(false);
  // Reference to hidden file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /**
   * Handles the dragover event
   * Sets visual feedback and specifies copy operation
   *
   * @param {React.DragEvent<HTMLDivElement>} e - Drag event
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (!isDragging) setIsDragging(true);
  };

  /**
   * Handles the dragleave event
   * Removes visual feedback
   */
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  /**
   * Handles the drop event
   * Processes dropped files and calls the onFilesSelected callback
   *
   * @param {React.DragEvent<HTMLDivElement>} e - Drop event
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);

    if (onFilesSelected) {
      onFilesSelected(files);
    }
  };

  /**
   * Handles click on the dropzone
   * Triggers the hidden file input
   */
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handles file selection from the file input
   * Processes selected files and calls the onFilesSelected callback
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (onFilesSelected) {
      onFilesSelected(files);
    }
  };

  return (
    // Main dropzone container with event handlers and accessibility attributes
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      aria-busy={isDragging}
      className="h-full flex justify-center"
    >
      <div className="text-center">
        {/* Image upload icon */}
        <svg
          className="mx-auto size-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
        {/* Upload instructions */}
        <div className="mt-4 flex text-sm/6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-lime-600 focus-within:ring-2 focus-within:ring-lime-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-lime-500"
          >
            <span>Upload a file</span>
            {/* Hidden file input */}
            <input
              id={id}
              name={id}
              ref={fileInputRef}
              multiple={allowMultiple}
              onChange={handleFileChange}
              type="file"
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        {/* File type and size restrictions */}
        <p className="text-xs/5 text-gray-600">PNG up to 10MB</p>
      </div>
    </div>
  );
};
