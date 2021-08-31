import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { DeleteEnemyErrors } from '../../domain/value-object/delete-enemy.errors';

export class DeleteEnemyInteractorRequest {
  constructor(readonly enemyId: Uuid, readonly userId: Uuid) {}

  static parse(enemyId: string, userId: string): DeleteEnemyInteractorRequest {
    const errors = new DeleteEnemyErrors();

    const enemyIdV = Uuid.parse(enemyId, errors, DomainErrorsProp.enemyId);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (enemyIdV === null || userIdV === null) {
      throw new BadRequestException({ errors: errors });
    }

    return new DeleteEnemyInteractorRequest(enemyIdV, userIdV);
  }
}
