import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AbandonBattleCommand } from '../../domain/command/abandon-battle.command';
import { AbandonBattleErrors } from '../../domain/value-object/abandon-battle.errors';
import { AbandonBattleRepository } from '../interface/abandon-battle.repository';
import { AbandonBattleInteractorRequest } from './abandon-battle.interactor.request';

@Injectable()
export class AbandonBattleInteractor {
  constructor(readonly repository: AbandonBattleRepository) {}

  async invoke(request: AbandonBattleInteractorRequest): Promise<void> {
    const avatar = await this.repository.getAvatarByUserId(request.userId.val);
    const battle = await this.repository.getBattleById(request.battleId.val);

    const errors = new AbandonBattleErrors();
    const cmd = AbandonBattleCommand.new(battle, avatar, errors);
    if (cmd === null) throw new ValidationException(errors);

    await this.repository.abandonBattle(cmd);
  }
}
