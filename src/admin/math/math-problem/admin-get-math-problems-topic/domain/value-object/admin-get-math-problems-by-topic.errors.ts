import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminGetMathProblemsByTopicErrors
  implements Partial<DomainErrors>
{
  userId: string[] = [];
  mathTopicId: string[] = [];
}
