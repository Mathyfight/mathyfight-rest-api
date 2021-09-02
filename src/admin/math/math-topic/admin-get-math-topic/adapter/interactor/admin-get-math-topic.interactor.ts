import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminGetMathTopicCommand } from '../../domain/command/admin-get-math-topic.command';
import { AdminGetMathTopicErrors } from '../../domain/value-object/admin-get-math-topic.errors';
import { AdminGetMathTopicRepository } from '../interface/admin-get-math-topic.repository';
import { AdminGetMathTopicInteractorRequest } from './admin-get-math-topic.interactor.request';
import {
  AdminGetMathTopicInteractorResponse,
  AdminGetMathTopicLevelInteractorResponse,
} from './admin-get-math-topic.interactor.response';

@Injectable()
export class AdminGetMathTopicInteractor {
  constructor(private readonly repository: AdminGetMathTopicRepository) {}

  async invoke(
    req: AdminGetMathTopicInteractorRequest,
  ): Promise<AdminGetMathTopicInteractorResponse> {
    const user = await this.repository.getUserById(req.userId.val);
    const mathTopic = await this.repository.getMathTopicById(
      req.mathTopicId.val,
    );

    const errors = new AdminGetMathTopicErrors();
    const cmd = AdminGetMathTopicCommand.new(user, mathTopic, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new AdminGetMathTopicInteractorResponse(
      cmd.mathTopic.id,
      cmd.mathTopic.name,
      cmd.mathTopic.description,
      cmd.mathTopic.imageUrl,
      cmd.mathTopic.levels.map(
        (l) =>
          new AdminGetMathTopicLevelInteractorResponse(
            l.number,
            l.enemyName,
            l.enemyImageUrl,
          ),
      ),
    );
  }
}
