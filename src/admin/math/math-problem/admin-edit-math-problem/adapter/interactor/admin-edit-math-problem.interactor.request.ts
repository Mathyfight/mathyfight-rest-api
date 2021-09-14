import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { MathAnswerDescription } from '../../../core/domain/value-object/math-answer-description';
import { MathProblemDescription } from '../../../core/domain/value-object/math-problem-description';
import { AdminEditMathProblemErrors } from '../../domain/value-object/admin-edit-math-problem.errors';

export class AdminEditMathProblemInteractorRequest {
  constructor(
    readonly mathProblemId: Uuid,
    readonly userId: Uuid,
    readonly difficultyId: Uuid | undefined,
    readonly description: MathProblemDescription | undefined,
    readonly image: Express.Multer.File | undefined,
    readonly mathAnswersIds: string[] | undefined,
    readonly mathAnswersDescription: string[] | undefined,
    readonly mathAnswersIsCorrect: boolean[] | undefined,
  ) {}

  static readonly mathAnswersAttributesNotSameLength =
    'la cantidad de descripciones de respuestas debe coincidir con la cantidad de respuestas marcadas como correctas o no correctas';
  static readonly imageAndDescriptionUndefined =
    'debe tener una descripción o una imagen';
  static readonly noCorrectAnswer = 'debe tener una respuesta correcta';
  static readonly noIncorrectAnswer = 'debe tener una respuesta incorrecta';
  static readonly noAttributesEdited = 'debe editar al menos un atributo';

  static parse(
    mathProblemId: string,
    userId: string,
    difficultyId: string | undefined,
    description: string | undefined,
    image: Express.Multer.File | undefined,
    mathAnswersIds: string[] | undefined,
    mathAnswersDescription: string[] | undefined,
    mathAnswersIsCorrect: boolean[] | undefined,
  ): AdminEditMathProblemInteractorRequest {
    const errors = new AdminEditMathProblemErrors();

    const mathProblemIdV = Uuid.parse(
      mathProblemId,
      errors,
      DomainErrorsProp.mathProblemId,
    );
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const difficultyIdV =
      difficultyId === undefined
        ? undefined
        : Uuid.parse(difficultyId, errors, DomainErrorsProp.difficultyId);
    const descriptionV =
      description === undefined
        ? undefined
        : MathProblemDescription.parse(
            description,
            errors,
            DomainErrorsProp.description,
          );

    let mathAnswerIdsBad = false;
    let mathAnswerDescriptionsBad = false;
    let mathAnswersAttributesNotSameArraySize = false;

    if (mathAnswersIds !== undefined) {
      mathAnswerIdsBad = mathAnswersIds.some(
        (id) =>
          Uuid.parse(id, errors, DomainErrorsProp.mathAnswersIds) === null,
      );
    }

    if (mathAnswersDescription !== undefined) {
      mathAnswerDescriptionsBad = mathAnswersDescription.some(
        (d) =>
          MathAnswerDescription.parse(
            d,
            errors,
            DomainErrorsProp.mathAnswersDescription,
          ) === null,
      );
    }

    if (
      mathAnswersIds !== undefined &&
      mathAnswersDescription !== undefined &&
      mathAnswersIsCorrect !== undefined
    ) {
      mathAnswersAttributesNotSameArraySize =
        mathAnswersDescription.length !== mathAnswersIsCorrect.length ||
        mathAnswersIsCorrect.length !== mathAnswersIds.length;
      if (mathAnswersAttributesNotSameArraySize)
        errors.errors.push(this.mathAnswersAttributesNotSameLength);
    }

    if (descriptionV === undefined && image === undefined)
      errors.errors.push(this.imageAndDescriptionUndefined);

    const allAttributesUndefined =
      difficultyId === undefined &&
      description === undefined &&
      image === undefined &&
      mathAnswersIds === undefined &&
      mathAnswersDescription === undefined &&
      mathAnswersIsCorrect === undefined;
    if (allAttributesUndefined) errors.errors.push(this.noAttributesEdited);

    const mathAnswersIncomplete =
      mathAnswersIds !== undefined &&
      mathAnswersDescription === undefined &&
      mathAnswersIsCorrect === undefined;
    if (mathAnswersIncomplete) {
      errors.errors.push(
        'si se va a editar una respuesta, se debe especificar el atributo descripción o si es correcto',
      );
    }

    if (
      mathProblemIdV === null ||
      userIdV === null ||
      mathAnswersIncomplete ||
      difficultyIdV === null ||
      descriptionV === null ||
      (descriptionV === undefined && image === undefined) ||
      mathAnswerIdsBad ||
      mathAnswerDescriptionsBad ||
      mathAnswersAttributesNotSameArraySize ||
      allAttributesUndefined
    )
      throw new ValidationException(errors);

    return new AdminEditMathProblemInteractorRequest(
      mathProblemIdV,
      userIdV,
      difficultyIdV,
      descriptionV,
      image,
      mathAnswersIds,
      mathAnswersDescription,
      mathAnswersIsCorrect,
    );
  }
}
