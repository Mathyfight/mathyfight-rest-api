import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetBattleCommand } from '../../domain/command/get-battle.command';
import { GetBattleErrors } from '../../domain/value-object/get-battle.errors';
import { GetBattleRepository } from '../interface/get-battle.repository';
import { GetBattleInteractorRequest } from './get-battle.interactor.request';
import {
  GetBattleInteractorResponse,
  GetBattleLevelUpInteractorResponse,
} from './get-battle.interactor.response';

@Injectable()
export class GetBattleInteractor {
  constructor(private readonly repository: GetBattleRepository) {}

  async invoke(
    request: GetBattleInteractorRequest,
  ): Promise<GetBattleInteractorResponse> {
    const battle = await this.repository.getBattle(request.battleId.val);
    const user = await this.repository.getUserById(request.userId.val);

    const errors = new GetBattleErrors();
    const cmd = GetBattleCommand.new(battle, user, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new GetBattleInteractorResponse(
      cmd.playerHealth,
      cmd.playerDefense,
      cmd.enemyHealth,
      cmd.enemyDefense,
      cmd.playerWon,
      cmd.levelUp === null
        ? null
        : new GetBattleLevelUpInteractorResponse(
            cmd.levelUp.health,
            cmd.levelUp.attack,
            cmd.levelUp.defense,
          ),
      cmd.nextLevelId,
    );
  }
}
