export abstract class StorageService {
  abstract getFileUrl(fileName: string): string;
  abstract uploadFile(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<string>;
  abstract deleteFile(filename: string): Promise<void>;
}
