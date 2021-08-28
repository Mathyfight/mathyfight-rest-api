import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { StartBattleCommand } from '../../domain/command/start-battle.command';
import { StartBattleErrors } from '../../domain/value-object/start-battle.errors';
import { StartBattleRepository } from '../interface/start-battle.repository';
import { StartBattleInteractorRequest } from './start-battle.interactor.request';
import { StartBattleInteractorResponse } from './start-battle.interactor.response';

@Injectable()
export class StartBattleInteractor {
  constructor(readonly repository: StartBattleRepository) {}

  async invoke(
    request: StartBattleInteractorRequest,
  ): Promise<StartBattleInteractorResponse> {
    const user = await this.repository.getUserById(request.userId.val);
    const mathTopicLevel = await this.repository.getMathTopicLevelById(
      request.levelId.val,
    );

    const errors = new StartBattleErrors();
    const cmd = StartBattleCommand.new(user, mathTopicLevel, errors);

    if (cmd === null) throw new ValidationException(errors);

    await this.repository.startBattle(cmd);
    return new StartBattleInteractorResponse(cmd.battleId);
  }
}
