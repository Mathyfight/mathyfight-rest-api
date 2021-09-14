import { MathAnswer } from './math-answer';

export class MathProblem {
  constructor(readonly id: string, readonly answers: MathAnswer[]) {}
}
