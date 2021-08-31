import { DeleteEnemyCommand } from '../../domain/command/delete-enemy.command';
import { MathTopicLevel } from '../../domain/entity/mathTopicLevel';
import { User } from '../../domain/entity/user';

export abstract class DeleteEnemyRespository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract deleteEnemy(cmd: DeleteEnemyCommand): Promise<void>;
  abstract getMathTopicLevel(enemyId: string): Promise<MathTopicLevel | null>;
}
