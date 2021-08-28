import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetEnemyOfBattleCommand } from '../../domain/command/get-enemy-of-battle.command';
import { GetEnemyOfBattleErrors } from '../../domain/value-object/get-enemy-of-battle.errors';
import { GetEnemyOfBattleRepository } from '../interface/get-enemy-of-battle.repository';
import { GetEnemyOfBattleInteractorRequest } from './get-enemy-of-battle.interactor.request';
import { GetEnemyOfBattleInteractorResponse } from './get-enemy-of-battle.interactor.response';

@Injectable()
export class GetEnemyOfBattleInteractor {
  constructor(private readonly repository: GetEnemyOfBattleRepository) {}

  async invoke(
    request: GetEnemyOfBattleInteractorRequest,
  ): Promise<GetEnemyOfBattleInteractorResponse> {
    const battle = await this.repository.getBattleById(request.battleId.val);
    const errors = new GetEnemyOfBattleErrors();

    const cmd = GetEnemyOfBattleCommand.new(battle, request.userId.val, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new GetEnemyOfBattleInteractorResponse(cmd.enemy);
  }
}
