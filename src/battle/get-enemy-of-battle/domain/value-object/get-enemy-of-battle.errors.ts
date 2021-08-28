import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetEnemyOfBattleErrors implements Partial<DomainErrors> {
  battleId: string[] = [];
  userId: string[] = [];
}
