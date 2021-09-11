import { Injectable } from '@nestjs/common';
import { GetAdminUserRepository } from 'src/admin/core/adapter/interface/get-admin-user.repository';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { getFileNameFromUrl } from 'src/shared/domain/value-object/util/util';
import { AdminDeleteMathProblemCommand } from '../../domain/command/admin-delete-math-problem.command';
import { AdminDeleteMathProblemErrors } from '../../domain/value-object/admin-delete-math-problem.errors';
import { AdminDeleteMathProblemRepository } from '../interface/admin-delete-math-problem.repository';
import { AdminDeleteMathProblemInteractorRequest } from './admin-delete-math-problem.interactor.request';

@Injectable()
export class AdminDeleteMathProblemInteractor {
  constructor(
    private readonly adminRepository: GetAdminUserRepository,
    private readonly repository: AdminDeleteMathProblemRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(req: AdminDeleteMathProblemInteractorRequest): Promise<void> {
    const user = await this.adminRepository.getAdmin(req.userId.val);
    const mathProblem = await this.repository.getMathProblem(
      req.mathProblemId.val,
    );

    const errors = new AdminDeleteMathProblemErrors();
    const cmd = AdminDeleteMathProblemCommand.new(user, mathProblem, errors);
    if (cmd === null) throw new ValidationException(errors);

    if (cmd.mathProblem.imageUrl !== null) {
      const imageUrlFileName = getFileNameFromUrl(cmd.mathProblem.imageUrl);
      await this.storageService.deleteFile(imageUrlFileName);
    }
    await this.repository.deleteMathProblem(cmd);
  }
}
