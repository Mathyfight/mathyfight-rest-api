import { MathTopicLevel } from '../entity/mathTopicLevel';
import { User } from '../entity/user';
import { DeleteEnemyErrors } from '../value-object/delete-enemy.errors';

export class DeleteEnemyCommand {
  static readonly userDoesNotExist = 'debe existir';
  static readonly userIsNotAdmin = 'debe ser administrador';
  static readonly enemyExistInMathLevel = 'no debe estar asociado al nivel';

  private constructor(readonly enemyId: string) {}

  static new(
    user: User | null,
    mathTopicLevel: MathTopicLevel | null,
    enemyId: string,
    errors: DeleteEnemyErrors,
  ): DeleteEnemyCommand | null {
    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }
    if (!user.isAdmin) {
      errors.userId.push(this.userIsNotAdmin);
      return null;
    }

    if (mathTopicLevel !== null) {
      errors.enemyId.push(`${this.enemyExistInMathLevel} ${mathTopicLevel.id}`);
    }

    return new DeleteEnemyCommand(enemyId);
  }
}
