import * as path from 'path';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { User } from '../entity/user';
import { AddEnemyErrors } from '../value-object/add-enemy.errors';

export class AddEnemyCommand {
  static readonly userDoesNotExist = 'debe existir';
  static readonly userIsNotAdmin = 'debe ser administrador';

  private constructor(
    readonly name: string,
    readonly image: Express.Multer.File,
  ) {}

  readonly id: string = Uuid.newPrimitive();
  readonly imageName = `enemy_${this.id}${path.extname(
    this.image.originalname,
  )}`;

  static new(
    user: User | null,
    enemyName: string,
    enemyImage: Express.Multer.File,
    errors: AddEnemyErrors,
  ): AddEnemyCommand | null {
    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }
    if (!user.isAdmin) {
      errors.userId.push(this.userIsNotAdmin);
      return null;
    }

    return new AddEnemyCommand(enemyName, enemyImage);
  }
}
