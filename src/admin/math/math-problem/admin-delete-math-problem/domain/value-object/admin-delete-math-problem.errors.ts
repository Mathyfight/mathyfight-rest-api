import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminDeleteMathProblemErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  mathProblemId: string[] = [];
}
