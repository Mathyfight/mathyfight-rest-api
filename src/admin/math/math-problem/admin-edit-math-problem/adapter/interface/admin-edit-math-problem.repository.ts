import { PersistMathProblem } from '../../domain/command/persist-math-problem';
import { Difficulty } from '../../domain/entity/difficulty';
import { MathProblem } from '../../domain/entity/math-problem';

export abstract class AdminEditMathProblemRepository {
  abstract getMathProblem(mathProblemId: string): Promise<MathProblem | null>;
  abstract getDifficulty(difficultyId: string): Promise<Difficulty | null>;
  abstract persistMathProblem(cmd: PersistMathProblem): Promise<void>;
}
