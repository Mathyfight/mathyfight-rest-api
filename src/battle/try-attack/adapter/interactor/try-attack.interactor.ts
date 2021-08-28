import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { TryAttackCommand } from '../../domain/command/try-attack.command';
import { TryAttackErrors } from '../../domain/value-object/try-attack.errors';
import { TryAttackRepository } from '../interface/try-attack.repository';
import { TryAttackInteractorRequest } from './try-attack.interactor.request';
import { TryAttackInteractorResponse } from './try-attack.interactor.response';

@Injectable()
export class TryAttackInteractor {
  constructor(private readonly repository: TryAttackRepository) {}

  async invoke(
    request: TryAttackInteractorRequest,
  ): Promise<TryAttackInteractorResponse> {
    const user = await this.repository.getUserById(request.userId.val);
    const battle = await this.repository.getBattleById(request.battleId.val);
    const mathAnswer = await this.repository.getMathAnswerById(
      request.answerId.val,
    );

    const errors = new TryAttackErrors();
    const cmd = TryAttackCommand.new(battle, user, mathAnswer, errors);
    if (cmd === null) throw new ValidationException(errors);

    if (cmd.playerAttacksEnemy !== undefined)
      await this.repository.playerAttacksEnemy(cmd.playerAttacksEnemy);

    if (cmd.enemyAttacksPlayer !== undefined)
      await this.repository.enemyAttacksPlayer(cmd.enemyAttacksPlayer);

    return new TryAttackInteractorResponse(
      cmd.playerAttacksEnemy !== undefined,
    );
  }
}
