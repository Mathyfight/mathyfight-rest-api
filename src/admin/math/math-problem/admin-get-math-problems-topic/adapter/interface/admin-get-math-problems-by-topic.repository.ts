import { MathProblem } from '../../domain/entity/math-problem';
import { User } from '../../domain/entity/user';

export abstract class AdminGetMathProblemsByTopicRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathProblemsByTopic(mathTopicId: string): Promise<MathProblem[]>;
}
