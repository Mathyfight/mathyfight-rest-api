import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminEditMathProblemErrors implements Partial<DomainErrors> {
  mathProblemId: string[] = [];
  userId: string[] = [];
  difficultyId: string[] = [];
  description: string[] = [];
  mathAnswersIds: string[] = [];
  mathAnswersDescription: string[] = [];
  mathAnswersIsCorrect: string[] = [];
  errors: string[] = [];
}
