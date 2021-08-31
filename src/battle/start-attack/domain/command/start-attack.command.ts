import { randomElement } from 'src/shared/domain/value-object/util/util';
import { Battle } from '../entity/battle';
import { MathProblem } from '../entity/math-problem';
import { StartAttackErrors } from '../value-object/start-attack.errors';
import { GetMathProblem } from './get-math-problem';
import { SaveMathProblemBattle } from './save-math-problem-battle';

export class StartAttackCommand {
  private constructor(
    readonly getMathProblem: GetMathProblem,
    readonly saveMathProblemBattle: SaveMathProblemBattle,
  ) {}

  static readonly battleDoesNotExist = 'debe existir';
  static readonly userIsNotOwnerOfBattle = 'debe tener el avatar de la batalla';
  static readonly difficultyDoesNotHaveMathProblems =
    'debe tener problemas de matemática';
  static readonly battleIsOver = 'no debe haber acabado';

  static new(
    battle: Battle | null,
    userId: string,
    mathProblems: MathProblem[] | null,
    errors: StartAttackErrors,
  ): StartAttackCommand | null {
    if (battle === null || mathProblems === null) {
      errors.battleId.push(this.battleDoesNotExist);
      return null;
    }

    const isUserOwnerOfAvatar = battle.userId === userId;
    if (!isUserOwnerOfAvatar) {
      errors.userId.push(this.userIsNotOwnerOfBattle);
    }

    const areThereMathProblems = mathProblems.length > 0;
    if (!areThereMathProblems)
      errors.difficultyId.push(this.difficultyDoesNotHaveMathProblems);

    const isBattleOver = battle.isBattleOver;
    if (isBattleOver) errors.battleId.push(this.battleIsOver);

    if (!isUserOwnerOfAvatar || !areThereMathProblems || isBattleOver)
      return null;

    const notUsedMathProblems = mathProblems.filter(
      (mp) => !battle.mathProblemsIdsUsed.includes(mp.id),
    );
    const mathProblem =
      notUsedMathProblems.length > 0
        ? randomElement(notUsedMathProblems)
        : randomElement(mathProblems);

    return new StartAttackCommand(
      new GetMathProblem(mathProblem),
      new SaveMathProblemBattle(mathProblem.id, battle.id),
    );
  }
}
