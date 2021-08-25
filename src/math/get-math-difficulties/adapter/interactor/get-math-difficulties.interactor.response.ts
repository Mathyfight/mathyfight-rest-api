import { MathDifficulty } from '../../domain/entity/math-difficulty';

export class GetMathDifficultiesInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly damageMultiplier: number;
  readonly maxSeconds: number;

  constructor(difficulty: MathDifficulty) {
    this.id = difficulty.id;
    this.damageMultiplier = difficulty.damageMultiplier;
    this.maxSeconds = difficulty.maxSeconds;
    this.name = difficulty.name;
  }
}
