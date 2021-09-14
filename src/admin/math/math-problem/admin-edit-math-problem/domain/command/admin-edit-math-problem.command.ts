import * as path from 'path';
import { AdminUser } from 'src/admin/core/domain/entity/admin-user';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { Difficulty } from '../entity/difficulty';
import { MathProblem } from '../entity/math-problem';
import { AdminEditMathProblemErrors } from '../value-object/admin-edit-math-problem.errors';
import { PersistMathAnswer, PersistMathProblem } from './persist-math-problem';

export class AdminEditMathProblemCommand {
  constructor(
    readonly persistMathProblem: PersistMathProblem,
    readonly uploadImage: UploadImage | undefined,
  ) {}

  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';
  static readonly atLeast1AnswerNotForProblem =
    'todas las respuestas deben pertenecer al problema';

  static new(
    user: AdminUser | null,
    mathProblem: MathProblem | null,
    difficulty: Difficulty | null | undefined,
    image: Express.Multer.File | undefined,
    description: string | undefined,
    mathAnswersIds: string[] | undefined,
    mathAnswersDescription: string[] | undefined,
    mathAnswersIsCorrect: boolean[] | undefined,
    errors: AdminEditMathProblemErrors,
  ): AdminEditMathProblemCommand | null {
    if (user === null) {
      errors.userId.push(this.notExist);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.notAdmin);
      return null;
    }

    if (mathProblem === null) {
      errors.mathProblemId.push(this.notExist);
      return null;
    }

    if (difficulty === null) {
      errors.difficultyId.push(this.notExist);
      return null;
    }

    if (mathAnswersIds !== undefined) {
      const mathAnswersNotForProblem = mathAnswersIds.some(
        (a) => mathProblem.answers.find((ma) => ma.id !== a) === undefined,
      );
      if (mathAnswersNotForProblem) {
        errors.errors.push(this.atLeast1AnswerNotForProblem);
        return null;
      }
    }

    const imageExtension =
      image === undefined ? undefined : path.extname(image.originalname);
    const imageName =
      image === undefined
        ? undefined
        : `math-problem_${mathProblem.id}${imageExtension}`;

    return new AdminEditMathProblemCommand(
      new PersistMathProblem(
        mathProblem.id,
        description,
        mathAnswersIds?.map(
          (id, i) =>
            new PersistMathAnswer(
              id,
              mathAnswersDescription === undefined
                ? undefined
                : mathAnswersDescription[i],
              mathAnswersIsCorrect === undefined
                ? undefined
                : mathAnswersIsCorrect[i],
            ),
        ),
        difficulty?.id,
        imageName,
      ),
      image === undefined || imageName === undefined
        ? undefined
        : new UploadImage(image, imageName),
    );
  }
}
