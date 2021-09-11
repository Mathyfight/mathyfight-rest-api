import { AdminDeleteMathProblemCommand } from '../../domain/command/admin-delete-math-problem.command';
import { MathProblem } from '../../domain/entity/math-problem';

export abstract class AdminDeleteMathProblemRepository {
  abstract getMathProblem(mathProblemId: string): Promise<MathProblem | null>;
  abstract deleteMathProblem(cmd: AdminDeleteMathProblemCommand): Promise<void>;
}
