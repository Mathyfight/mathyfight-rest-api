import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { ResetPasswordCommand } from '../../domain/command/reset-password.command';
import { ResetPasswordErrors } from '../../domain/value-object/reset-password.errors';
import { ResetPasswordRepository } from '../interface/reset-password.repository';
import { ResetPasswordInteractorRequest } from './reset-password.interactor.request';

@Injectable()
export class ResetPasswordInteractor {
  constructor(readonly repository: ResetPasswordRepository) {}

  async invoke(request: ResetPasswordInteractorRequest): Promise<void> {
    const errors = new ResetPasswordErrors();

    const token = await this.repository.getTokenById(
      request.resetPasswordTokenId.val,
    );

    const command = ResetPasswordCommand.new(
      token,
      request.password.val,
      errors,
    );
    if (command === null) throw new ValidationException(errors);

    await this.repository.resetPassword(command);
  }
}
