import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetMathTopicErrors implements Partial<DomainErrors> {
  topicId: string[] = [];
  userId: string[] = [];
}
