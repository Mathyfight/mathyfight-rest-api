import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class DeleteEnemyErrors implements Partial<DomainErrors> {
  enemyId: string[] = [];
  userId: string[] = [];
}
