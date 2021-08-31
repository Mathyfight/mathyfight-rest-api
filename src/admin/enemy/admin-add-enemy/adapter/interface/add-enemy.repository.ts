import { AddEnemyCommand } from '../../domain/command/add-enemy.command';
import { User } from '../../domain/entity/user';

export abstract class AddEnemyRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract addEnemy(cmd: AddEnemyCommand, imageUrl: string): Promise<void>;
}
