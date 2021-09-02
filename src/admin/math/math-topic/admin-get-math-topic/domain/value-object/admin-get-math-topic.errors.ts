import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminGetMathTopicErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  mathTopicId: string[] = [];
}
