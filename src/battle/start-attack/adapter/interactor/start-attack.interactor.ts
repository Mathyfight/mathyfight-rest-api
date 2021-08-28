import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { StartAttackCommand } from '../../domain/command/start-attack.command';
import { StartAttackErrors } from '../../domain/value-object/start-attack.errors';
import { StartAttackRepository } from '../interface/start-attack.repository';
import { StartAttackInteractorRequest } from './start-attack.interactor.request';
import {
  StartAttackAnswerInteractorResponse,
  StartAttackInteractorResponse,
} from './start-attack.interactor.response';

@Injectable()
export class StartAttackInteractor {
  constructor(private readonly repository: StartAttackRepository) {}

  async invoke(
    request: StartAttackInteractorRequest,
  ): Promise<StartAttackInteractorResponse> {
    const battle = await this.repository.getBattleById(request.battleId.val);
    const mathProblems = await this.repository.getMathProblemsByDifficultyId(
      request.difficultyId.val,
    );

    const errors = new StartAttackErrors();
    const cmd = StartAttackCommand.new(
      battle,
      request.userId.val,
      mathProblems,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);
    await this.repository.saveMathProblemAndBattle(cmd.saveMathProblemBattle);

    return new StartAttackInteractorResponse(
      cmd.getMathProblem.mathProblem.description,
      cmd.getMathProblem.mathProblem.imageUrl,
      cmd.getMathProblem.mathProblem.answers.map(
        (a) => new StartAttackAnswerInteractorResponse(a.id, a.description),
      ),
    );
  }
}
