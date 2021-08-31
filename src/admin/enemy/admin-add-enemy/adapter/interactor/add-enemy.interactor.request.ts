import { BadRequestException } from '@nestjs/common';
import { FormImage } from 'src/shared/domain/value-object/general/form-image';
import { EnemyName } from 'src/admin/enemy/core/domain/value-object/enemy-name';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AddEnemyErrors } from '../../domain/value-object/add-enemy.errors';

export class AddEnemyInteractorRequest {
  constructor(
    readonly name: EnemyName,
    readonly image: FormImage,
    readonly userId: Uuid,
  ) {}

  static parse(
    name: string,
    image: Express.Multer.File | undefined,
    userId: string,
  ): AddEnemyInteractorRequest {
    const errors = new AddEnemyErrors();

    const nameV = EnemyName.parse(name, errors, DomainErrorsProp.name);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const enemyImageV = FormImage.parse(image, errors, DomainErrorsProp.image);

    if (nameV === null || userIdV === null || enemyImageV === null) {
      throw new BadRequestException({ errors: errors });
    }

    return new AddEnemyInteractorRequest(nameV, enemyImageV, userIdV);
  }
}
