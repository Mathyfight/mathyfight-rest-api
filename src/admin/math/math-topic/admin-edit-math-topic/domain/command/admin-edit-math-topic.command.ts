import * as path from 'path';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { Enemy } from '../entity/enemy';
import { MathArea } from '../entity/math-area';
import { MathTopic } from '../entity/math-topic';
import { User } from '../entity/user';
import { AdminEditMathTopicErrors } from '../value-object/admin-edit-math-topic.errors';
import { PersistMathTopic } from './persist-math-topic';

export class AdminEditMathTopicCommand {
  private constructor(
    readonly persistMathTopic: PersistMathTopic,
    readonly uploadImage?: UploadImage,
  ) {}

  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';
  static readonly someDontExist = 'deben existir';
  static readonly someAreNotAvailable = 'deben estar disponibles';

  static new(
    user: User | null,
    mathTopic: MathTopic | null,
    errors: AdminEditMathTopicErrors,
    mathArea?: MathArea | null,
    enemies?: (Enemy | null)[] | undefined,
    name?: string,
    description?: string,
    image?: Express.Multer.File,
  ): AdminEditMathTopicCommand | null {
    if (user === null) errors.userId.push(this.notExist);

    if (mathTopic === null) errors.mathTopicId.push(this.notExist);

    if (mathArea === null) errors.mathAreaId.push(this.notExist);

    const allEnemiesExist =
      enemies === undefined ? undefined : enemies.every((e) => e !== null);
    if (allEnemiesExist !== undefined && !allEnemiesExist)
      errors.enemyIds.push(this.someDontExist);

    const allEnemiesAreAvailable =
      enemies === undefined ? undefined : enemies.every((e) => e?.available);
    if (allEnemiesAreAvailable !== undefined && !allEnemiesAreAvailable)
      errors.enemyIds.push(this.someAreNotAvailable);

    if (user === null) return null;

    if (!user.isAdmin) errors.userId.push(this.notAdmin);

    if (
      mathTopic === null ||
      mathArea === null ||
      (allEnemiesExist !== undefined && !allEnemiesExist) ||
      (allEnemiesAreAvailable !== undefined && !allEnemiesAreAvailable) ||
      !user.isAdmin
    )
      return null;

    const imageExtension =
      image === undefined ? undefined : path.extname(image.originalname);
    const imageName =
      image === undefined
        ? undefined
        : `math-topic_${mathTopic.id}${imageExtension}`;

    return new AdminEditMathTopicCommand(
      new PersistMathTopic(
        mathTopic.id,
        name,
        description,
        mathArea?.id,
        enemies === undefined ? undefined : enemies.map((e) => e!.id),
        mathTopic.mathTopicLevelsIds,
        imageName,
      ),
      image === undefined || imageName === undefined
        ? undefined
        : new UploadImage(image, imageName),
    );
  }
}
