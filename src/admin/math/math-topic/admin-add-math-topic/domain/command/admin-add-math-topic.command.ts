import * as path from 'path';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Enemy } from '../entity/enemy';
import { Level } from '../entity/level';
import { MathArea } from '../entity/math-area';
import { Player } from '../entity/player';
import { User } from '../entity/user';
import { AdminAddMathTopicErrors } from '../value-object/admin-add-math-topic.errors';
import {
  MathTopicLevel,
  PersistMathTopic,
  PlayerUnlockedMathTopicLevel,
} from './persist-math-topic';
import { UploadMathTopicImage } from './upload-math-topic-image';

export class AdminAddMathTopicCommand {
  private constructor(
    readonly persistMathTopic: PersistMathTopic,
    readonly uploadMathTopicImage: UploadMathTopicImage,
  ) {}

  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';
  static readonly mathAreaNotFound = 'debe existir';
  static readonly someEnemiesAreUsed =
    'algunos enemigos están asociados a otro tema';

  static new(
    user: User | null,
    mathArea: MathArea | null,
    name: string,
    description: string,
    image: Express.Multer.File,
    enemyIds: string[],
    unusedEnemies: Enemy[],
    levels: Level[],
    players: Player[],
    errors: AdminAddMathTopicErrors,
  ): AdminAddMathTopicCommand | null {
    if (mathArea === null) errors.mathAreaId.push(this.mathAreaNotFound);

    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (!user.isAdmin) errors.userId.push(this.userNotAdmin);

    const allEnemiesAreUnused = enemyIds.every(
      (enemyId) => unusedEnemies.find((e) => e.id === enemyId) !== undefined,
    );
    if (!allEnemiesAreUnused) errors.enemyIds.push(this.someEnemiesAreUsed);

    if (!user.isAdmin || mathArea === null || !allEnemiesAreUnused) return null;

    const mathTopicId: string = Uuid.newPrimitive();
    const imageExtension = path.extname(image.originalname);
    const imageName = `math-topic_${mathTopicId}${imageExtension}`;

    levels.sort((a, b) => a.number - b.number);
    return new AdminAddMathTopicCommand(
      new PersistMathTopic(
        mathTopicId,
        name,
        description,
        mathArea.id,
        enemyIds.map(
          (enemyId, idx) =>
            new MathTopicLevel(
              enemyId,
              levels[idx].id,
              levels[idx].number === 0
                ? players.map((p) => new PlayerUnlockedMathTopicLevel(p.id))
                : null,
            ),
        ),
        imageName,
      ),
      new UploadMathTopicImage(image, imageName),
    );
  }
}
