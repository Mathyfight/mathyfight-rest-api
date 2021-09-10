import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminGetMathProblemErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  mathProblemId: string[] = [];
}
