import { MathDifficulty } from '../../domain/entity/math-difficulty';

export abstract class GetMathDifficultiesRepository {
  abstract getMathDifficulties(): Promise<MathDifficulty[]>;
}
