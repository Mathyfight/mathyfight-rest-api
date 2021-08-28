import { BattleAvatar } from './battle-avatar';
import { Enemy } from './enemy';
import { MathProblem } from './math-problem';

export class Battle {
  constructor(
    readonly id: string,
    readonly avatar: BattleAvatar,
    readonly mathProblem: MathProblem | null,
    readonly enemy: Enemy,
    readonly nextMathTopicLevelId: string | null,
  ) {}
}
