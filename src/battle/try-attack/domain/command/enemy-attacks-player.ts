import { BattleAvatar } from '../entity/battle-avatar';
import { Enemy } from '../entity/enemy';

export class EnemyAttacksPlayer {
  readonly updatedPlayerDefense: number;
  readonly updatedPlayerHealth: number;
  readonly mathProblemSolved = false;

  constructor(
    readonly battleMathProblemId: string,
    readonly battleId: string,
    playerAvatar: BattleAvatar,
    enemy: Enemy,
  ) {
    this.updatedPlayerHealth = playerAvatar.currentHealth;

    if (playerAvatar.currentDefense - enemy.attack <= 0) {
      this.updatedPlayerDefense = 0;
      const damageAfterBreakingDefense = Math.abs(
        playerAvatar.currentDefense - enemy.attack,
      );
      if (playerAvatar.currentHealth - damageAfterBreakingDefense <= 0) {
        this.updatedPlayerHealth = 0;
      } else {
        this.updatedPlayerHealth =
          playerAvatar.currentHealth - damageAfterBreakingDefense;
      }
    } else {
      this.updatedPlayerDefense = playerAvatar.currentDefense - enemy.attack;
    }
  }
}
