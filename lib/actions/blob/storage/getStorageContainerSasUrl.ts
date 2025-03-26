"use server";

/**
 * Azure Blob Storage SAS URL Generator
 *
 * This module provides functionality to generate Shared Access Signature (SAS) URLs
 * for Azure Blob Storage containers. It implements security best practices by:
 * - Restricting access to specific containers
 * - Implementing time-limited access
 * - Providing minimal required permissions
 * - Enforcing HTTPS-only access
 *
 * @module azure-blob-sas
 */

import {
  BlobServiceClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import {
  GetBlobSasUrlResult,
  GetStorageContainerSasUrlParams,
} from "@/lib/actions/blob/storage/types";

/**
 * Azure Storage connection string from environment variables
 * Format: "DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=..."
 */
const connectionString: string | undefined =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

/** Maximum validity period for generated SAS tokens in hours */
const MAX_EXPIRY_HOURS = 1;

/** List of container names that are allowed to be accessed */
const ALLOWED_CONTAINERS = ["images"] as const;

/**
 * Default permissions configuration for SAS tokens
 * Implements principle of the least privilege by enabling only required permissions
 * and explicitly disabling potentially dangerous operations
 */
const DEFAULT_PERMISSIONS: ContainerSASPermissions = {
  // Essential permissions
  read: true, // Allow reading blob content and properties
  write: true, // Allow writing blob content and properties
  delete: true, // Allow deleting blobs
  list: true, // Allow listing blobs in container
  add: true, // Allow adding new blocks to append blobs
  create: true, // Allow creating new blobs

  // Explicitly disabled permissions for security
  tag: false, // Prevent tag manipulation
  move: false, // Prevent blob movement between containers
  execute: false, // Prevent stored procedure execution
  deleteVersion: false, // Prevent version-specific deletion
  setImmutabilityPolicy: false, // Prevent immutability policy changes
  permanentDelete: false, // Prevent permanent deletion
  filterByTags: false, // Prevent tag-based filtering
} as const;

/**
 * Generates a Shared Access Signature (SAS) URL for an Azure Storage container
 *
 * This function creates a time-limited SAS URL that provides secure access to
 * a specific Azure Storage container. It includes security measures such as:
 * - Container name validation
 * - Automatic container creation if not exists
 * - Fixed expiry time
 * - HTTPS-only access
 * - Predefined minimal permissions
 *
 * @param {Object} params - Function parameters
 * @param {string} params.containerName - Name of the target storage container
 *
 * @returns {Promise<GetBlobSasUrlResult>} Object containing either:
 *   - sasUrl: The generated SAS URL for container access
 *   - error: Error message if generation fails
 *
 * @throws {Error} If container name is invalid or connection string is missing
 *
 * @example
 * const result = await storage({ containerName: "images" });
 * if (result.sasUrl) {
 *   // Use the SAS URL
 *   console.log(result.sasUrl);
 * } else {
 *   // Handle error
 *   console.error(result.error);
 * }
 */
export async function getStorageContainerSasUrl({
  containerName,
}: GetStorageContainerSasUrlParams): Promise<GetBlobSasUrlResult> {
  try {
    // Validate container name against allowed list
    if (!ALLOWED_CONTAINERS.includes(containerName)) {
      return { error: "Invalid container name" };
    }

    // Verify connection string exists
    if (!connectionString) {
      return { error: "Missing Azure Storage connection string" };
    }

    // Initialize blob service client
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Ensure container exists before generating SAS
    await containerClient.createIfNotExists();

    // Calculate token validity period
    const startsOn = new Date();
    const expiresOn = new Date(
      new Date().valueOf() + MAX_EXPIRY_HOURS * 3600 * 1000,
    );

    // Set up permissions for the SAS token
    const permissions = new ContainerSASPermissions();
    Object.assign(permissions, DEFAULT_PERMISSIONS);

    // Configure SAS token parameters
    const sasOptions = {
      containerName: containerClient.containerName,
      permissions,
      startsOn,
      expiresOn,
      protocol: SASProtocol.Https, // Enforce HTTPS-only access
    };

    // Generate the SAS token
    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      blobServiceClient.credential as StorageSharedKeyCredential,
    ).toString();

    // Combine container URL with SAS token
    const sasUrl = `${containerClient.url}?${sasToken}`;

    return { sasUrl };
  } catch (error) {
    // Log and return any errors that occur
    console.error("Error generating SAS URL:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
