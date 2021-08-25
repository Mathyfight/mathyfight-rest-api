import { MathTopic } from '../../domain/entity/math-topic';
import { User } from '../../domain/entity/user';

export abstract class GetMathTopicRepository {
  abstract getMathTopic(
    mathTopicId: string,
    playerId: string,
  ): Promise<MathTopic | null>;
  abstract getUserById(userId: string): Promise<User | null>;
}
