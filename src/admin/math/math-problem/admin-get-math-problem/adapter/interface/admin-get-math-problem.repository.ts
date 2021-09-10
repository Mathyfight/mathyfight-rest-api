import { MathProblem } from '../../domain/entity/math-problem';

export abstract class AdminGetMathProblemRepository {
  abstract getMathProblem(mathProblemId: string): Promise<MathProblem | null>;
}
