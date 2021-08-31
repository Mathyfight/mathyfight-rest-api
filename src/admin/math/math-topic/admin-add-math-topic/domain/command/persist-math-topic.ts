import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class PersistMathTopic {
  readonly imageUrl: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly mathAreaId: string,
    readonly mathTopicLevels: MathTopicLevel[],
    imageName: string,
  ) {
    this.imageUrl = `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}

export class MathTopicLevel {
  readonly id: string = Uuid.newPrimitive();

  constructor(
    readonly enemyId: string,
    readonly levelId: string,
    readonly playerUnlockedLevels: PlayerUnlockedMathTopicLevel[] | null,
  ) {}
}

export class PlayerUnlockedMathTopicLevel {
  readonly id: string = Uuid.newPrimitive();

  constructor(readonly playerId: string) {}
}
