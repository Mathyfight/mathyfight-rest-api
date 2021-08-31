export class UploadImage {
  constructor(
    readonly image: Express.Multer.File,
    readonly imageName: string,
  ) {}
}
