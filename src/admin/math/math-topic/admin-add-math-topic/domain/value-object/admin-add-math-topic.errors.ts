import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminAddMathTopicErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  name: string[] = [];
  description: string[] = [];
  mathAreaId: string[] = [];
  enemyIds: string[] = [];
}
