import { Battle } from '../entity/battle';
import { Enemy } from '../entity/enemy';
import { GetEnemyOfBattleErrors } from '../value-object/get-enemy-of-battle.errors';

export class GetEnemyOfBattleCommand {
  static readonly battleDoesNotExist = 'debe existir';
  static readonly userIsNotOwnerOfBattle = 'debe ser el avatar de la batalla';

  private constructor(readonly enemy: Enemy) {}

  static new(
    battle: Battle | null,
    userId: string,
    errors: GetEnemyOfBattleErrors,
  ): GetEnemyOfBattleCommand | null {
    if (battle === null) {
      errors.battleId.push(this.battleDoesNotExist);
      return null;
    }

    if (battle.userId !== userId) {
      errors.userId.push(this.userIsNotOwnerOfBattle);
      return null;
    }

    return new GetEnemyOfBattleCommand(battle.enemy);
  }
}
