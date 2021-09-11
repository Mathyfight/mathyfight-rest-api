import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminGetMathProblemsByTopicCommand } from '../../domain/command/admin-get-math-problems-by-topic.command';
import { AdminGetMathProblemsByTopicErrors } from '../../domain/value-object/admin-get-math-problems-by-topic.errors';
import { AdminGetMathProblemsByTopicRepository } from '../interface/admin-get-math-problems-by-topic.repository';
import { AdminGetMathProblemsByTopicInteractorRequest } from './admin-get-math-problems-by-topic.interactor.request';
import { AdminGetMathProblemsByTopicInteractorResponse } from './admin-get-math-problems-by-topic.interactor.response';

@Injectable()
export class AdminGetMathProblemsByTopicInteractor {
  constructor(
    private readonly repository: AdminGetMathProblemsByTopicRepository,
  ) {}

  async invoke(
    req: AdminGetMathProblemsByTopicInteractorRequest,
  ): Promise<AdminGetMathProblemsByTopicInteractorResponse[]> {
    const user = await this.repository.getUserById(req.userId.val);

    const errors = new AdminGetMathProblemsByTopicErrors();
    const cmd = AdminGetMathProblemsByTopicCommand.new(user, errors);
    if (cmd === null) throw new ValidationException(errors);

    const mathProblems = await this.repository.getMathProblemsByTopic(
      req.mathTopicId.val,
    );
    return mathProblems.map(
      (m) =>
        new AdminGetMathProblemsByTopicInteractorResponse(
          m.id,
          m.description,
          m.difficulty,
          m.imageUrl,
        ),
    );
  }
}
