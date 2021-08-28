import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AbandonBattleErrors implements Partial<DomainErrors> {
  battleId: string[] = [];
  userId: string[] = [];
}
