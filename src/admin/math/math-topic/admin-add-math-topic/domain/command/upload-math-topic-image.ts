export class UploadMathTopicImage {
  constructor(
    readonly image: Express.Multer.File,
    readonly imageName: string,
  ) {}
}
