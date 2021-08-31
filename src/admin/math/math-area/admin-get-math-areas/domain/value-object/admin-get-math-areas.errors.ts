import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminGetMathAreasErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
