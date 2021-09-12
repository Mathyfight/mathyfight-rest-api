import { PersistMathProblem } from '../../domain/command/persist-math-problem';
import { Difficulty } from '../../domain/entity/difficulty';
import { MathTopic } from '../../domain/entity/math-topic';

export abstract class AdminAddMathProblemRepository {
  abstract getDifficulty(difficultyId: string): Promise<Difficulty | null>;
  abstract getMathTopic(mathTopicId: string): Promise<MathTopic | null>;
  abstract persistMathProblem(cmd: PersistMathProblem): Promise<void>;
}
