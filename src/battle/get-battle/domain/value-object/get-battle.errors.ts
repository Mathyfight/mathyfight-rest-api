import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetBattleErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  battleId: string[] = [];
}
