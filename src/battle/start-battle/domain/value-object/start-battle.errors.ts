import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class StartBattleErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  levelId: string[] = [];
}
