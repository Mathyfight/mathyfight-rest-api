import { MathTopic } from '../../domain/entity/math-topic';
import { User } from '../../domain/entity/user';

export abstract class AdminGetMathTopicRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathTopicById(mathTopicId: string): Promise<MathTopic | null>;
}
