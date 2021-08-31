import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminDeleteMathTopicErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  topicId: string[] = [];
}
