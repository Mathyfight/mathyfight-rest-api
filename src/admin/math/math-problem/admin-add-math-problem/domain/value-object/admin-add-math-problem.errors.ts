import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminAddMathProblemErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  difficultyId: string[] = [];
  mathTopicId: string[] = [];
  description: string[] = [];
  mathAnswersDescription: string[] = [];
  mathAnswersIsCorrect: string[] = [];
  errors: string[] = [];
}
