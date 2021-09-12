import { Injectable } from '@nestjs/common';
import { GetAdminUserRepository } from 'src/admin/core/adapter/interface/get-admin-user.repository';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminAddMathProblemCommand } from '../../domain/command/admin-add-math-problem.command';
import { AdminAddMathProblemErrors } from '../../domain/value-object/admin-add-math-problem.errors';
import { AdminAddMathProblemRepository } from '../interface/admin-add-math-problem.repository';
import { AdminAddMathProblemInteractorRequest } from './admin-add-math-problem.interactor.request';
import { AdminAddMathProblemInteractorResponse } from './admin-add-math-problem.interactor.response';

@Injectable()
export class AdminAddMathProblemInteractor {
  constructor(
    private readonly adminRepository: GetAdminUserRepository,
    private readonly storageService: StorageService,
    private readonly repository: AdminAddMathProblemRepository,
  ) {}

  async invoke(
    req: AdminAddMathProblemInteractorRequest,
  ): Promise<AdminAddMathProblemInteractorResponse> {
    const adminUser = await this.adminRepository.getAdmin(req.userId.val);
    const mathTopic = await this.repository.getMathTopic(req.mathTopicId.val);
    const difficulty = await this.repository.getDifficulty(
      req.difficultyId.val,
    );

    const errors = new AdminAddMathProblemErrors();
    const cmd = AdminAddMathProblemCommand.new(
      adminUser,
      mathTopic,
      difficulty,
      req.description?.val,
      req.image,
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

    return new AdminAddMathProblemInteractorResponse(
      cmd.persistMathProblem.id,
      cmd.persistMathProblem.imageUrl === undefined
        ? null
        : cmd.persistMathProblem.imageUrl,
    );
  }
}
