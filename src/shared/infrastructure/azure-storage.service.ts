import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { StorageService } from '../adapter/interface/storage.service';

export class AzureStorageService implements StorageService {
  getBlobClient(fileName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      process.env.MATHYFIGHT_AZURE_STORAGE_URL!,
    );
    const containerClient = blobClientService.getContainerClient(
      process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER!,
    );
    const blobClient = containerClient.getBlockBlobClient(fileName);
    return blobClient;
  }

  async deleteFile(filename: string): Promise<void> {
    const blobClient = this.getBlobClient(filename);
    await blobClient.deleteIfExists();
  }

  async uploadFile(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const blobClient = this.getBlobClient(fileName);
    await blobClient.uploadData(file.buffer);
    return blobClient.url;
  }

  getFileUrl(fileName: string): string {
    const blobClient = this.getBlobClient(fileName);
    return blobClient.url;
  }
}
