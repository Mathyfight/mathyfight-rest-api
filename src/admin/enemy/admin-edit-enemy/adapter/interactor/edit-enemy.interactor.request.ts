import { BadRequestException } from '@nestjs/common';
import { FormImage } from 'src/shared/domain/value-object/general/form-image';
import { EnemyName } from 'src/admin/enemy/core/domain/value-object/enemy-name';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { EditEnemyErrors } from '../../domain/value-object/edit-enemy.errors';

export class EditEnemyInteractorRequest {
  constructor(
    readonly name: EnemyName | undefined,
    readonly image: FormImage | undefined,
    readonly enemyId: Uuid,
    readonly userId: Uuid,
  ) {}

  static parse(
    name: string | undefined,
    image: Express.Multer.File | undefined,
    enemyId: string,
    userId: string,
  ): EditEnemyInteractorRequest {
    const errors = new EditEnemyErrors();

    const nameV =
      name !== undefined
        ? EnemyName.parse(name, errors, DomainErrorsProp.name)
        : undefined;
    const enemyImageV =
      image !== undefined
        ? FormImage.parse(image, errors, DomainErrorsProp.image)
        : undefined;
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const enemyIdV = Uuid.parse(enemyId, errors, DomainErrorsProp.enemyId);

    if (
      nameV === null ||
      enemyImageV === null ||
      userIdV === null ||
      enemyIdV === null
    ) {
      throw new BadRequestException({ errors: errors });
    }

    return new EditEnemyInteractorRequest(
      nameV,
      enemyImageV,
      enemyIdV,
      userIdV,
    );
  }
}
