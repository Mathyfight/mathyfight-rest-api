import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class TryAttackErrors implements Partial<DomainErrors> {
  battleId: string[] = [];
  userId: string[] = [];
  answerId: string[] = [];
}
