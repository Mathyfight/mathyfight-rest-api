import { SaveMathProblemBattle } from '../../domain/command/save-math-problem-battle';
import { Battle } from '../../domain/entity/battle';
import { MathProblem } from '../../domain/entity/math-problem';

export abstract class StartAttackRepository {
  abstract getBattleById(battleId: string): Promise<Battle | null>;
  abstract getMathProblemsByDifficultyId(
    difficultyId: string,
  ): Promise<MathProblem[]>;
  abstract saveMathProblemAndBattle(cmd: SaveMathProblemBattle): Promise<void>;
}
