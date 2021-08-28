import * as moment from 'moment';
import { MathAnswer } from './math-answer';

export class MathProblem {
  constructor(
    readonly battleMathProblemId: string,
    readonly correctAnswer: MathAnswer,
    readonly createdAt: moment.Moment,
    readonly attackMultiplier: number,
    readonly earnedGold: number,
    readonly earnedExperience: number,
  ) {}

  readonly endTime = this.createdAt.add(5, 'minutes');
  readonly isInsideAnswerTimeFrame = moment().isSameOrBefore(this.endTime);
}
