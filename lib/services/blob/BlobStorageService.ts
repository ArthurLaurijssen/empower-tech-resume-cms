/**
 * @file blob-services.ts
 * Azure Blob Storage Service
 *
 * Provides a comprehensive interface for managing files in Azure Blob Storage.
 * Primarily used for handling developer profile images with features including:
 * - File existence checking
 * - Directory management
 * - File upload and deletion
 * - Virtual directory handling
 *
 * Security features:
 * - Uses SAS URLs for authenticated access
 * - Implements proper error handling and logging
 * - Maintains virtual directory structure
 */

import { ContainerClient } from "@azure/storage-blob";

/**
 * Core service class for Azure Blob Storage operations
 * Handles all blob storage interactions through a secure SAS URL
 */
export class BlobStorageService {
  private containerClient: ContainerClient;

  /**
   * Creates a new BlobStorageService instance
   *
   * @param {string} sasUrl - Shared Access Signature URL for the container
   * @throws {Error} If SAS URL is invalid or connection fails
   */
  constructor(sasUrl: string) {
    // Create the container client directly from the SAS URL
    this.containerClient = new ContainerClient(sasUrl);
  }

  /**
   * Checks if a specific blob exists in the container
   *
   * @param {string} blobName - Name of the blob to check
   * @returns {Promise<boolean>} True if blob exists, false otherwise
   * @throws {Error} If check operation fails
   */
  async checkIfBlobExists(blobName: string) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    return await blockBlobClient.exists();
  }

  /**
   * Checks if any files exist within a virtual directory
   * Uses hierarchy-based listing for efficient directory scanning
   *
   * @param {string} directory - Virtual directory path to check
   * @returns {Promise<boolean>} True if directory contains files, false otherwise
   * @throws {Error} If directory check fails
   *
   * @example
   * // Check if 'profiles/user123' contains any files
   * const hasFiles = await service.checkFilesExistInsideVirtualDirectory('profiles/user123');
   */
  async checkFilesExistInsideVirtualDirectory(
    directory: string,
  ): Promise<boolean> {
    try {
      // List blobs hierarchically with directory as prefix
      for await (const blobItem of this.containerClient.listBlobsByHierarchy(
        "/",
        {
          prefix: directory,
        },
      )) {
        // Return true on first blob found
        if (blobItem.kind === "blob") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking files:", error);
      throw error;
    }
  }

  /**
   * Retrieves all file names within a virtual directory
   * Uses flat listing to get all files regardless of subdirectory structure
   *
   * @param {string} directory - Virtual directory path to list
   * @returns {Promise<string[]>} Array of file names in the directory
   * @throws {Error} If listing operation fails
   *
   * @example
   * // Get all files in 'profiles/user123'
   * const files = await service.getAllFiles('profiles/user123');
   */
  async getAllFiles(directory: string): Promise<string[]> {
    const files: string[] = [];
    const options = { prefix: directory };

    try {
      // Get iterator for flat blob listing
      const iterator = this.containerClient.listBlobsFlat(options);

      // Check first item to determine if directory has any contents
      const firstItem = await iterator.next();

      if (firstItem.done) {
        return files;
      } else {
        // Add first item and then iterate through remaining items
        files.push(firstItem.value.name);
        for await (const blob of iterator) {
          files.push(blob.name);
        }
      }
      return files;
    } catch (error) {
      console.error("Failed to list blobs", error);
      throw error;
    }
  }

  /**
   * Uploads a file to a specified virtual directory
   * Handles directory path normalization and content type setting
   *
   * @param {File} file - File object to upload
   * @param {string} directory - Target virtual directory path
   * @returns {Promise<string>} URL of the uploaded file
   * @throws {Error} If upload fails
   *
   * @example
   * // Upload 'profile.jpg' to 'profiles/user123'
   * const url = await service.uploadFile(fileObject, 'profiles/user123');
   */
  async uploadFile(file: File, directory: string): Promise<string> {
    try {
      // Ensure directory path ends with a slash
      if (!directory.endsWith("/")) {
        directory += "/";
      }

      // Create full blob path and get client
      const blobName = `${directory}${file.name}`;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      // Upload file with proper content type
      await blockBlobClient.uploadData(await file.arrayBuffer(), {
        blobHTTPHeaders: { blobContentType: file.type },
      });

      return blockBlobClient.url;
    } catch (error) {
      console.error("Failed to upload file", error);
      throw error;
    }
  }

  /**
   * Deletes a specified file from the container
   *
   * @param {string} filePath - Full path of file to delete
   * @throws {Error} If deletion fails
   *
   * @example
   * // Delete 'profiles/user123/avatar.jpg'
   * await service.deleteFile('profiles/user123/avatar.jpg');
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(filePath);
      await blockBlobClient.delete();
    } catch (error) {
      console.error("Failed to delete file", error);
      throw error;
    }
  }
}
