import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { MathAnswerDescription } from '../../../core/domain/value-object/math-answer-description';
import { MathProblemDescription } from '../../../core/domain/value-object/math-problem-description';
import { AdminAddMathProblemErrors } from '../../domain/value-object/admin-add-math-problem.errors';

export class AdminAddMathProblemInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly difficultyId: Uuid,
    readonly mathTopicId: Uuid,
    readonly description: MathProblemDescription | undefined,
    readonly image: Express.Multer.File | undefined,
    readonly mathAnswersDescription: string[],
    readonly mathAnswersIsCorrect: boolean[],
  ) {}

  static readonly mathAnswersAttributesNotSameLength =
    'la cantidad de descripciones de respuestas debe coincidir con la cantidad de respuestas marcadas como correctas o no correctas';
  static readonly imageAndDescriptionUndefined =
    'debe tener una descripción o una imagen';
  static readonly noCorrectAnswer = 'debe tener una respuesta correcta';
  static readonly noIncorrectAnswer = 'debe tener una respuesta incorrecta';

  static parse(
    userId: string,
    difficultyId: string,
    mathTopicId: string,
    description: string | undefined,
    image: Express.Multer.File | undefined,
    mathAnswersDescription: string[],
    mathAnswersIsCorrect: boolean[],
  ): AdminAddMathProblemInteractorRequest {
    const errors = new AdminAddMathProblemErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const difficultyIdV = Uuid.parse(
      difficultyId,
      errors,
      DomainErrorsProp.difficultyId,
    );
    const mathTopicIdV = Uuid.parse(
      mathTopicId,
      errors,
      DomainErrorsProp.mathTopicId,
    );
    const descriptionV =
      description === undefined
        ? undefined
        : MathProblemDescription.parse(
            description,
            errors,
            DomainErrorsProp.description,
          );
    const mathAnswerDescriptionsBad = mathAnswersDescription.some(
      (d) =>
        MathAnswerDescription.parse(
          d,
          errors,
          DomainErrorsProp.mathAnswersDescription,
        ) === null,
    );

    const mathAnswersAttributesNotSameArraySize =
      mathAnswersDescription.length !== mathAnswersIsCorrect.length;
    if (mathAnswersAttributesNotSameArraySize)
      errors.errors.push(this.mathAnswersAttributesNotSameLength);

    const thereIsNoCorrectAnswer = mathAnswersIsCorrect.every((a) => !a);
    if (thereIsNoCorrectAnswer)
      errors.mathAnswersIsCorrect.push(this.noCorrectAnswer);

    const thereIsNoIncorrectAnswer = mathAnswersIsCorrect.every((a) => a);
    if (thereIsNoIncorrectAnswer)
      errors.mathAnswersIsCorrect.push(this.noIncorrectAnswer);

    if (descriptionV === undefined && image === undefined)
      errors.errors.push(this.imageAndDescriptionUndefined);

    if (
      userIdV === null ||
      difficultyIdV === null ||
      mathTopicIdV === null ||
      descriptionV === null ||
      mathAnswerDescriptionsBad ||
      (descriptionV === undefined && image === undefined) ||
      mathAnswersAttributesNotSameArraySize ||
      thereIsNoCorrectAnswer ||
      thereIsNoIncorrectAnswer
    )
      throw new ValidationException(errors);

    return new AdminAddMathProblemInteractorRequest(
      userIdV,
      difficultyIdV,
      mathTopicIdV,
      descriptionV,
      image,
      mathAnswersDescription,
      mathAnswersIsCorrect,
    );
  }
}
