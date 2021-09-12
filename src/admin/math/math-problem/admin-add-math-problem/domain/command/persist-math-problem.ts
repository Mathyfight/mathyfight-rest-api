import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class PersistMathProblem {
  readonly imageUrl: string | null;

  constructor(
    readonly id: string,
    readonly description: string,
    readonly mathTopicId: string,
    readonly answers: PersistMathAnswer[],
    readonly difficultyId: string,
    imageName: string | undefined,
  ) {
    this.imageUrl =
      imageName === undefined
        ? null
        : `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}

export class PersistMathAnswer {
  readonly id: string = Uuid.newPrimitive();

  constructor(readonly description: string, readonly isCorrect: boolean) {}
}
