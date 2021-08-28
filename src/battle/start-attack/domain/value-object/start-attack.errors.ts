import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class StartAttackErrors implements Partial<DomainErrors> {
  battleId: string[] = [];
  userId: string[] = [];
  difficultyId: string[] = [];
}
