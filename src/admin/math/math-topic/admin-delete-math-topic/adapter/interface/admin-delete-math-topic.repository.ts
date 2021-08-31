import { AdminDeleteMathTopicCommand } from '../../domain/command/admin-delete-math-topic.command';
import { MathTopic } from '../../domain/entity/math-topic';
import { User } from '../../domain/entity/user';

export abstract class AdminDeleteMathTopicRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathTopicById(mathTopicId: string): Promise<MathTopic | null>;
  abstract deleteMathTopic(cmd: AdminDeleteMathTopicCommand): Promise<void>;
}
