import * as path from 'path';
import { AdminUser } from 'src/admin/core/domain/entity/admin-user';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Difficulty } from '../entity/difficulty';
import { MathTopic } from '../entity/math-topic';
import { AdminAddMathProblemErrors } from '../value-object/admin-add-math-problem.errors';
import { PersistMathAnswer, PersistMathProblem } from './persist-math-problem';

export class AdminAddMathProblemCommand {
  constructor(
    readonly persistMathProblem: PersistMathProblem,
    readonly uploadImage: UploadImage | undefined,
  ) {}

  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';

  static new(
    user: AdminUser | null,
    mathTopic: MathTopic | null,
    difficulty: Difficulty | null,
    description: string | undefined,
    image: Express.Multer.File | undefined,
    mathAnswersDescription: string[],
    mathAnswersIsCorrect: boolean[],
    errors: AdminAddMathProblemErrors,
  ): AdminAddMathProblemCommand | null {
    if (user === null) {
      errors.userId.push(this.notExist);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.notAdmin);
      return null;
    }

    if (mathTopic === null) {
      errors.mathTopicId.push(this.notExist);
      return null;
    }

    if (difficulty === null) {
      errors.difficultyId.push(this.notExist);
      return null;
    }

    const mathProblemId = Uuid.newPrimitive();
    const imageExtension =
      image === undefined ? undefined : path.extname(image.originalname);
    const imageName =
      image === undefined
        ? undefined
        : `math-problem_${mathProblemId}${imageExtension}`;

    return new AdminAddMathProblemCommand(
      new PersistMathProblem(
        mathProblemId,
        description === undefined ? '' : description,
        mathTopic.id,
        mathAnswersDescription.map(
          (d, i) => new PersistMathAnswer(d, mathAnswersIsCorrect[i]),
        ),
        difficulty.id,
        imageName,
      ),
      image === undefined || imageName === undefined
        ? undefined
        : new UploadImage(image, imageName),
    );
  }
}
