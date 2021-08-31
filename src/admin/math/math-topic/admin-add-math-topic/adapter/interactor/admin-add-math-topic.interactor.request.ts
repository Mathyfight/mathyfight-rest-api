import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { MathTopicDescription } from '../../../core/domain/value-object/math-topic-description';
import { MathTopicName } from '../../../core/domain/value-object/math-topic-name';
import { AdminAddMathTopicErrors } from '../../domain/value-object/admin-add-math-topic.errors';

export class AdminAddMathTopicInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly name: MathTopicName,
    readonly description: MathTopicDescription,
    readonly image: Express.Multer.File,
    readonly mathAreaId: Uuid,
    readonly enemyIds: string[],
  ) {}

  static readonly someEnemyIdsInvalid = 'deben ser todos uuid v4';

  static parse(
    userId: string,
    name: string,
    description: string,
    image: Express.Multer.File,
    mathAreaId: string,
    enemyIds: string[],
  ): AdminAddMathTopicInteractorRequest {
    const errors = new AdminAddMathTopicErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const nameV = MathTopicName.parse(name, errors, DomainErrorsProp.name);
    const descriptionV = MathTopicDescription.parse(
      description,
      errors,
      DomainErrorsProp.description,
    );
    const mathAreaIdV = Uuid.parse(
      mathAreaId,
      errors,
      DomainErrorsProp.mathAreaId,
    );

    const anyInvalidEnemyId = enemyIds.some((id) => !Uuid.isValid(id));
    if (anyInvalidEnemyId) errors.enemyIds.push(this.someEnemyIdsInvalid);

    if (
      userIdV === null ||
      nameV === null ||
      descriptionV === null ||
      mathAreaIdV === null ||
      anyInvalidEnemyId
    )
      throw new ValidationException(errors);

    return new AdminAddMathTopicInteractorRequest(
      userIdV,
      nameV,
      descriptionV,
      image,
      mathAreaIdV,
      enemyIds,
    );
  }
}
