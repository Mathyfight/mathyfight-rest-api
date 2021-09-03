import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { MathTopicDescription } from '../../../core/domain/value-object/math-topic-description';
import { MathTopicName } from '../../../core/domain/value-object/math-topic-name';
import { AdminEditMathTopicErrors } from '../../domain/value-object/admin-edit-math-topic.errors';

export class AdminEditMathTopicInteratorRequest {
  constructor(
    readonly userId: Uuid,
    readonly mathTopicId: Uuid,
    readonly name?: MathTopicName,
    readonly description?: MathTopicDescription,
    readonly mathAreaId?: Uuid,
    readonly enemyIds?: string[],
    readonly image?: Express.Multer.File,
  ) {}

  static readonly someEnemyIdsInvalid = 'deben ser todos uuid v4';
  static readonly noAttributeEditedM = 'debes editar al menos un campo';

  static parse(
    userId: string,
    mathTopicId: string,
    name?: string,
    description?: string,
    mathAreaId?: string,
    enemyIds?: string[],
    image?: Express.Multer.File,
  ): AdminEditMathTopicInteratorRequest {
    const errors = new AdminEditMathTopicErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathTopicIdV = Uuid.parse(
      mathTopicId,
      errors,
      DomainErrorsProp.mathTopicId,
    );
    const nameV =
      name === undefined
        ? undefined
        : MathTopicName.parse(name, errors, DomainErrorsProp.name);
    const descriptionV =
      description === undefined
        ? undefined
        : MathTopicDescription.parse(
            description,
            errors,
            DomainErrorsProp.description,
          );
    const mathAreaIdV =
      mathAreaId === undefined
        ? undefined
        : Uuid.parse(mathAreaId, errors, DomainErrorsProp.mathAreaId);

    const anyInvalidEnemyId =
      enemyIds === undefined
        ? undefined
        : enemyIds.some((id) => !Uuid.isValid(id));
    if (anyInvalidEnemyId) errors.enemyIds.push(this.someEnemyIdsInvalid);

    const noAttributeEdited =
      name === undefined &&
      description === undefined &&
      mathAreaId === undefined &&
      enemyIds === undefined &&
      image === undefined;
    if (noAttributeEdited) errors.errors.push(this.noAttributeEditedM);

    if (
      userIdV === null ||
      mathTopicIdV === null ||
      nameV === null ||
      descriptionV === null ||
      mathAreaIdV === null ||
      anyInvalidEnemyId ||
      noAttributeEdited
    )
      throw new ValidationException(errors);

    return new AdminEditMathTopicInteratorRequest(
      userIdV,
      mathTopicIdV,
      nameV,
      descriptionV,
      mathAreaIdV,
      enemyIds,
      image,
    );
  }
}
