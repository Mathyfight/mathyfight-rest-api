import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class PersistMathProblem {
  readonly imageUrl?: string;

  constructor(
    readonly id: string,
    readonly description: string | undefined,
    readonly answers: PersistMathAnswer[] | undefined,
    readonly difficultyId: string | undefined,
    imageName: string | undefined,
  ) {
    this.imageUrl =
      imageName === undefined
        ? undefined
        : `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}

export class PersistMathAnswer {
  constructor(
    readonly id: string,
    readonly description: string | undefined,
    readonly isCorrect: boolean | undefined,
  ) {}
}
