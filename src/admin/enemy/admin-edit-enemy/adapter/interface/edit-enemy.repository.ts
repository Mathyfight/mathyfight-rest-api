import { EditEnemyCommand } from '../../domain/command/edit-enemy.command';
import { User } from '../../domain/entity/user';

export abstract class EditEnemyRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract editEnemy(
    cmd: EditEnemyCommand,
    enemyImageUrl?: string,
  ): Promise<void>;
}
