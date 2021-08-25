import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetMathTopicsByAreaErrors implements Partial<DomainErrors> {
  areaId: string[] = [];
}
