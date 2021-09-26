export class PersistEquipment {
  readonly imageUrl: string | undefined;

  constructor(
    readonly id: string,
    readonly name: string | undefined,
    readonly description: string | undefined,
    readonly buyPrice: number | undefined,
    readonly attack: number | undefined,
    readonly defense: number | undefined,
    readonly isActive: boolean | undefined,
    imageName: string | undefined,
  ) {
    this.imageUrl =
      imageName === undefined
        ? undefined
        : `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}
