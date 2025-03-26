/**
 * Represents the result of generating a Shared Access Signature (SAS) URL for an Azure Blob Storage container.
 */
export interface GetBlobSasUrlResult {
  /**
   * The generated SAS URL for the container.
   * This URL provides time-limited access to the specified container.
   */
  sasUrl?: string;

  /**
   * Error message if the SAS URL generation fails.
   * This will be populated instead of sasUrl in case of an error.
   */
  error?: string;
}

/**
 * Parameters for the getStorageContainerSasUrl function.
 */
export interface GetStorageContainerSasUrlParams {
  /**
   * The name of the container for which to generate the SAS URL.
   * Currently, only the "images" container is supported.
   */
  containerName: "images";
}
