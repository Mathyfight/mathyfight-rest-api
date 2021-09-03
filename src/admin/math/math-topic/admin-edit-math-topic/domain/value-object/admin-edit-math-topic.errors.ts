import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminEditMathTopicErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  mathTopicId: string[] = [];
  name: string[] = [];
  description: string[] = [];
  mathAreaId: string[] = [];
  enemyIds: string[] = [];
  image: string[] = [];
  errors: string[] = [];
}
