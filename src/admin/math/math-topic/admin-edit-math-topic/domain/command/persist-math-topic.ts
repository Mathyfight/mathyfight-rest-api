export class PersistMathTopic {
  readonly imageUrl?: string;

  constructor(
    readonly id: string,
    readonly name?: string,
    readonly description?: string,
    readonly mathAreaId?: string,
    readonly enemyIds?: string[],
    readonly mathTopicLevelIds?: string[],
    imageName?: string,
  ) {
    this.imageUrl =
      imageName === undefined
        ? undefined
        : `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}
