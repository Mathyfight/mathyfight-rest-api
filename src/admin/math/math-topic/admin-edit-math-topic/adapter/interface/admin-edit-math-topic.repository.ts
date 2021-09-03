import { PersistMathTopic } from '../../domain/command/persist-math-topic';
import { Enemy } from '../../domain/entity/enemy';
import { MathArea } from '../../domain/entity/math-area';
import { MathTopic } from '../../domain/entity/math-topic';
import { User } from '../../domain/entity/user';

export abstract class AdminEditMathTopicRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathTopicById(mathTopicId: string): Promise<MathTopic | null>;
  abstract getMathAreaById(mathAreaId: string): Promise<MathArea | null>;
  abstract getEnemies(
    enemyIds: string[],
    mathTopicId: string,
  ): Promise<(Enemy | null)[]>;
  abstract getImageUrlFromMathTopic(id: string): Promise<string | null>;
  abstract persistMathTopic(cmd: PersistMathTopic): Promise<void>;
}
