import { BadRequestException, Injectable } from '@nestjs/common';
import { ForgotPasswordCommand } from '../../domain/command/forgot-password.command';
import { ForgotPasswordErrors } from '../../domain/value-object/forgot-password.errors';
import { EmailSender } from '../interface/email.sender';
import { ForgotPasswordRepository } from '../interface/forgot-password.repository';
import { ForgotPasswordInteractorRequest } from './forgot-password.interactor.request';

@Injectable()
export class ForgotPasswordInteractor {
  constructor(
    readonly repository: ForgotPasswordRepository,
    readonly emailSender: EmailSender,
  ) {}

  async invoke(request: ForgotPasswordInteractorRequest): Promise<void> {
    const errors = new ForgotPasswordErrors();

    const user = await this.repository.getUserIdByEmail(request.email.val);
    const command = ForgotPasswordCommand.new(user, errors);

    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.saveResetPasswordToken(
      command.createResetPasswordToken,
    );
    await this.emailSender.send(command.sendResetPasswordEmail);
  }
}
