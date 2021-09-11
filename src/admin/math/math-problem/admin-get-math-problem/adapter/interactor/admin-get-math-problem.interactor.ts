import { Injectable } from '@nestjs/common';
import { GetAdminUserRepository } from 'src/admin/core/adapter/interface/get-admin-user.repository';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminGetMathProblemCommand } from '../../domain/command/admin-get-math-problem.command';
import { AdminGetMathProblemErrors } from '../../domain/value-object/admin-get-math-problem.errors';
import { AdminGetMathProblemRepository } from '../interface/admin-get-math-problem.repository';
import { AdminGetMathProblemInteractorRequest } from './admin-get-math-problem.interactor.request';
import {
  AdminGetMathProblemInteractorResponse,
  AdminGetMathProblemAnswerInteractorResponse,
} from './admin-get-math-problem.interactor.response';

@Injectable()
export class AdminGetMathProblemInteractor {
  constructor(
    private readonly repository: AdminGetMathProblemRepository,
    private readonly adminRepository: GetAdminUserRepository,
  ) {}

  async invoke(
    req: AdminGetMathProblemInteractorRequest,
  ): Promise<AdminGetMathProblemInteractorResponse> {
    const user = await this.adminRepository.getAdmin(req.userId.val);
    const mathProblem = await this.repository.getMathProblem(
      req.mathProblemId.val,
    );

    const errors = new AdminGetMathProblemErrors();
    const cmd = AdminGetMathProblemCommand.new(user, mathProblem, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new AdminGetMathProblemInteractorResponse(
      cmd.mathProblem.id,
      cmd.mathProblem.description,
      cmd.mathProblem.difficultyId,
      cmd.mathProblem.difficultyName,
      cmd.mathProblem.imageUrl,
      cmd.mathProblem.answers.map(
        (a) =>
          new AdminGetMathProblemAnswerInteractorResponse(
            a.id,
            a.description,
            a.isCorrect,
          ),
      ),
    );
  }
}
