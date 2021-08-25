import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetMathTopicCommand } from '../../domain/command/get-math-topic.command';
import { GetMathTopicErrors } from '../../domain/value-object/get-math-topic.errors';
import { GetMathTopicRepository } from '../interface/get-math-topic.repository';
import { GetMathTopicInteractorRequest } from './get-math-topic.interactor.request';
import { GetMathTopicInteractorResponse } from './get-math-topic.interactor.response';

@Injectable()
export class GetMathTopicInteractor {
  constructor(readonly repository: GetMathTopicRepository) {}

  async invoke(
    request: GetMathTopicInteractorRequest,
  ): Promise<GetMathTopicInteractorResponse> {
    const errors = new GetMathTopicErrors();
    const user = await this.repository.getUserById(request.userId.val);
    if (user === null) {
      errors.userId.push('debe existir');
      throw new ValidationException(errors);
    }

    const mathTopic = await this.repository.getMathTopic(
      request.mathTopicId.val,
      user.playerId,
    );
    const cmd = GetMathTopicCommand.new(mathTopic, errors);
    if (cmd === null) throw new ValidationException(errors);
    return new GetMathTopicInteractorResponse(cmd.mathTopic);
  }
}
