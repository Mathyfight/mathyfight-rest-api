import { Injectable } from '@nestjs/common';
import { GetAdminUserRepository } from 'src/admin/core/adapter/interface/get-admin-user.repository';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminEditMathProblemCommand } from '../../domain/command/admin-edit-math-problem.command';
import { AdminEditMathProblemErrors } from '../../domain/value-object/admin-edit-math-problem.errors';
import { AdminEditMathProblemRepository } from '../interface/admin-edit-math-problem.repository';
import { AdminEditMathProblemInteractorRequest } from './admin-edit-math-problem.interactor.request';
import { AdminEditMathProblemInteractorResponse } from './admin-edit-math-problem.interactor.response';

@Injectable()
export class AdminEditMathProblemInteractor {
  constructor(
    private readonly adminRepository: GetAdminUserRepository,
    private readonly repository: AdminEditMathProblemRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    req: AdminEditMathProblemInteractorRequest,
  ): Promise<AdminEditMathProblemInteractorResponse> {
    const userAdmin = await this.adminRepository.getAdmin(req.userId.val);
    const mathProblem = await this.repository.getMathProblem(
      req.mathProblemId.val,
    );
    const difficulty =
      req.difficultyId === undefined
        ? undefined
        : await this.repository.getDifficulty(req.difficultyId.val);

    const errors = new AdminEditMathProblemErrors();
    const cmd = AdminEditMathProblemCommand.new(
      userAdmin,
      mathProblem,
      difficulty,
      req.image,
      req.description?.val,
      req.mathAnswersIds,
      req.mathAnswersDescription,
      req.mathAnswersIsCorrect,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    if (cmd.uploadImage !== undefined)
      await this.storageService.uploadFile(
        cmd.uploadImage.imageName,
        cmd.uploadImage.image,
      );
    await this.repository.persistMathProblem(cmd.persistMathProblem);

    return new AdminEditMathProblemInteractorResponse(
      cmd.persistMathProblem.imageUrl === undefined
        ? null
        : cmd.persistMathProblem.imageUrl,
    );
  }
}
