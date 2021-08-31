import { User } from '../entity/user';
import { EditEnemyErrors } from '../value-object/edit-enemy.errors';
import * as path from 'path';

export class EditEnemyCommand {
  static readonly userDoesNotExist = 'debe existir';
  static readonly userIsNotAdmin = 'debe ser administrador';

  private constructor(
    readonly enemyId: string,
    readonly name: string | undefined,
    readonly image: Express.Multer.File | undefined,
  ) {}

  readonly imageName =
    this.image !== undefined
      ? `enemy_${this.enemyId}${path.extname(this.image.originalname)}`
      : undefined;

  static new(
    user: User | null,
    enemyId: string,
    enemyName: string | undefined,
    enemyImage: Express.Multer.File | undefined,
    errors: EditEnemyErrors,
  ): EditEnemyCommand | null {
    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }
    if (!user.isAdmin) {
      errors.userId.push(this.userIsNotAdmin);
      return null;
    }

    return new EditEnemyCommand(enemyId, enemyName, enemyImage);
  }
}
