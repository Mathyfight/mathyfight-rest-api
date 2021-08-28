import { BattleAvatar } from '../entity/battle-avatar';
import { Battle } from '../entity/battle';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { MathProblem } from '../entity/math-problem';

export class PlayerAttacksEnemy {
  readonly updatedEnemyDefense: number;
  readonly updatedEnemyHealth: number;
  readonly earnedGold: number;
  readonly unlockMathTopicLevelId: string | null;
  readonly updatedPlayerExperience: number;
  readonly updatedPlayerLevel: number;
  readonly updatedPlayerBaseAttack: number;
  readonly updatedPlayerBaseDefense: number;
  readonly updatedPlayerMaxHealth: number;
  readonly mathProblemSolved = true;

  readonly battleId: string;
  readonly playerId: string;
  readonly battleMathProblemId: string;
  readonly avatarId: string;
  readonly playerUnlockedMathTopicLevelid: string = Uuid.newPrimitive();

  constructor(
    playerAvatar: BattleAvatar,
    battle: Battle,
    mathProblem: MathProblem,
  ) {
    this.updatedEnemyHealth = battle.enemy.currentHealth;
    this.earnedGold = 0;
    this.updatedPlayerExperience = playerAvatar.currentExperience;
    this.updatedPlayerLevel = playerAvatar.level;
    this.updatedPlayerBaseAttack = playerAvatar.baseAttack;
    this.updatedPlayerBaseDefense = playerAvatar.baseDefense;
    this.updatedPlayerMaxHealth = playerAvatar.maxHealth;
    this.unlockMathTopicLevelId = null;
    this.battleId = battle.id;
    this.avatarId = playerAvatar.id;
    this.battleMathProblemId = mathProblem.battleMathProblemId;
    this.playerId = playerAvatar.playerId;

    const finalPlayerAttack =
      playerAvatar.attack * mathProblem.attackMultiplier;
    if (battle.enemy.currentDefense - finalPlayerAttack <= 0) {
      this.updatedEnemyDefense = 0;
      const damageAfterBreakingDefense = Math.abs(
        battle.enemy.currentDefense - finalPlayerAttack,
      );
      if (battle.enemy.currentHealth - damageAfterBreakingDefense <= 0) {
        this.updatedEnemyHealth = 0;
        this.earnedGold = mathProblem.earnedGold;
        this.unlockMathTopicLevelId = battle.nextMathTopicLevelId;
        // give player experience
        if (
          playerAvatar.currentExperience + mathProblem.earnedExperience >=
          playerAvatar.maxExperience
        ) {
          playerAvatar.currentExperience =
            playerAvatar.currentExperience +
            mathProblem.earnedExperience -
            playerAvatar.maxExperience;
          playerAvatar.level += 1;
          playerAvatar.baseDefense += 1;
          playerAvatar.baseAttack += 1;
          playerAvatar.maxHealth += 3;
          while (playerAvatar.currentExperience >= playerAvatar.maxExperience) {
            playerAvatar.currentExperience -= playerAvatar.maxExperience;
            playerAvatar.level += 1;
            playerAvatar.baseDefense += 1;
            playerAvatar.baseAttack += 1;
            playerAvatar.maxHealth += 3;
          }
          this.updatedPlayerExperience = playerAvatar.currentExperience;
          this.updatedPlayerLevel = playerAvatar.level;
          this.updatedPlayerBaseAttack = playerAvatar.baseAttack;
          this.updatedPlayerBaseDefense = playerAvatar.baseDefense;
          this.updatedPlayerMaxHealth = playerAvatar.maxHealth;
        } else {
          this.updatedPlayerExperience =
            playerAvatar.currentExperience + mathProblem.earnedExperience;
        }
      } else {
        this.updatedEnemyHealth =
          battle.enemy.currentHealth - damageAfterBreakingDefense;
      }
    } else {
      this.updatedEnemyDefense =
        battle.enemy.currentDefense - finalPlayerAttack;
    }
  }
}
