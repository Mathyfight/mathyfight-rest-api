import { MathAnswer } from './math-answer';

export class MathProblem {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly difficultyId: string,
    readonly difficultyName: string,
    readonly imageUrl: string | null,
    readonly answers: MathAnswer[],
  ) {}
}
