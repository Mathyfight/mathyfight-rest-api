import { shuffle } from 'src/shared/domain/value-object/util/util';

export class MathProblem {
  readonly answers: MathProblemAnswer[];
  constructor(
    readonly id: string,
    readonly difficultyId: string,
    readonly description: string,
    readonly imageUrl: string | null,
    answers: MathProblemAnswer[],
  ) {
    this.answers = shuffle(answers);
  }
}

export class MathProblemAnswer {
  constructor(readonly id: string, readonly description: string) {}
}
