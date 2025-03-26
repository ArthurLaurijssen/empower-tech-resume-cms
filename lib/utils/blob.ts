/**
 * Blob Storage Service Factory Module
 *
 * Provides a secure factory function for creating Azure Blob Storage service instances.
 * Implements security checks and proper error handling for service creation.
 */

import { BlobStorageService } from "@/lib/services/blob/BlobStorageService";
import { getStorageContainerSasUrl } from "@/lib/actions/blob/storage/getStorageContainerSasUrl";

/**
 * Creates a new BlobStorageService instance with proper security checks
 *
 * Implements a factory pattern for creating blob storage services with:
 * - Container name validation
 * - SAS URL generation
 * - Error handling
 *
 * @param {string} containerName - Name of the container to access
 *                                Currently only supports "images" container
 * @returns {Promise<BlobStorageService>} New instance of BlobStorageService
 *
 * @throws {Error} If container name is invalid
 * @throws {Error} If SAS URL generation fails
 *
 * @example
 * try {
 *   const blobService = await createBlobService("images");
 *   // Use the service
 * } catch (error) {
 *   // Handle service creation error
 * }
 */
export async function createBlobService(
  containerName: string,
): Promise<BlobStorageService> {
  // Validate container name - currently restricted to "images"
  if (containerName != "images") {
    throw new Error("Invalid container name");
  }

  // Generate SAS URL for the container
  const result = await getStorageContainerSasUrl({ containerName });

  // Verify SAS URL was generated successfully
  if (!result.sasUrl) {
    throw new Error("Failed to create Blob Service - SAS URL not provided");
  }

  // Create and return new service instance
  return new BlobStorageService(result.sasUrl);
}
