"use client";

/**
 * Single Image Upload Component
 *
 * A React component that handles single image upload functionality with Azure Blob Storage.
 * Features include:
 * - Image upload via drag-and-drop or file selection
 * - Preview of uploaded image
 * - Delete functionality
 * - Loading states for various operations
 * - Error handling with context
 *
 * @module SingleImageUpload
 */

import { SingleImageUploadProps } from "@/components/ui/forms/single-image-upload/types";
import React, { useEffect, useState } from "react";
import { createBlobService } from "@/lib/utils/blob";
import { ImageDropzone } from "@/components/ui/forms/single-image-upload/ImageDropzone";
import Image from "next/image";
import Loader from "@/components/ui/loader/Loader";
import { useToast } from "@/hooks/useToast";

/**
 * SingleImageUpload Component
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.directory - Virtual directory path in blob storage
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {string} [props.label] - Optional label text for the upload area
 *
 * @example
 * ```tsx
 * <SingleImageUpload
 *   directory="user-avatars/123"
 *   className="my-4"
 *   label="Profile Picture"
 * />
 * ```
 */
export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  directory,
  className,
  label,
}: SingleImageUploadProps) => {
  // State management for file, loading states
  const [file, setFile] = useState<string | null>(null); // Current uploaded file URL
  const [isUploading, setIsUploading] = useState<boolean>(false); // Upload in progress
  const [isLoading, setIsLoading] = useState<boolean>(false); // Initial load state
  const { showToast } = useToast(); // Error handling context

  /**
   * Effect hook to fetch existing files on component mount
   * Checks if files exist in the specified directory and loads the first one
   */
  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const blobStorageService = await createBlobService("images");
        if (
          await blobStorageService.checkFilesExistInsideVirtualDirectory(
            directory,
          )
        ) {
          const fetchedFiles = await blobStorageService.getAllFiles(directory);
          setFile(fetchedFiles[0]);
        }
      } catch (error) {
        showToast("Failed to fetch image. Please try again.", "error");
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [directory, showToast]);

  /**
   * Handles file selection and upload
   * Deletes existing file (if any) before uploading new one
   *
   * @param {File[]} files - Array of selected files (only first file is used)
   */
  const onFilesSelected = async (files: File[]) => {
    setIsUploading(true);
    try {
      if (file) {
        await deleteFile();
      }
      const blobStorageService = await createBlobService("images");
      await blobStorageService.uploadFile(files[0], directory);

      const fetchedFiles = await blobStorageService.getAllFiles(directory);
      setFile(fetchedFiles[0]);
    } catch (error) {
      showToast("Failed to upload image. Please try again.", "error");
      console.error("Error deleting file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the event from bubbling up
    e.stopPropagation(); // Stop event propagation
    await deleteFile();
  };

  /**
   * Handles file deletion
   * Removes the current file from blob storage and updates state
   */
  const deleteFile = async () => {
    try {
      if (!file) return;
      const blobStorageService = await createBlobService("images");
      await blobStorageService.deleteFile(file);
      setFile(null);
    } catch (error) {
      showToast("Failed to delete image. Please try again.", "error");
      console.error("Error deleting file:", error);
    }
  };

  // Determine wrapper element based on className prop
  const Wrapper = className ? "div" : React.Fragment;

  return (
    <Wrapper {...(className && { className })}>
      {/* Optional label */}
      {label && (
        <label
          htmlFor={directory}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      {/* Main upload container */}
      <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-10 flex justify-center">
        {isLoading ? (
          // Show loader during initial load
          <Loader></Loader>
        ) : file ? (
          // Show image preview with delete buttons when file exists
          <div className="mx-5 border border-dashed border-gray-200 relative rounded-lg">
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-4 h-4 text-gray-600 text-xs text-center align-middle">
                X
              </div>
            </button>
            <Image
              src={`https://empowertechresume.blob.core.windows.net/images/${file}`}
              className="rounded-lg"
              alt={file}
              width={125}
              height={250}
              quality={75}
              sizes="(max-width: 768px) 100vw, 250px" // Add sizes
            />
          </div>
        ) : isUploading ? (
          // Show upload progress loader
          <Loader text="Uploading..."></Loader>
        ) : (
          // Show dropzone when no file is selected
          <ImageDropzone
            onFilesSelected={onFilesSelected}
            allowMultiple={false}
            id={directory}
          ></ImageDropzone>
        )}
      </div>
    </Wrapper>
  );
};
