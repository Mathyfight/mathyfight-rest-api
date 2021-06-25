import { BadRequestException, Injectable } from '@nestjs/common';
import { ForgotPasswordDomainService } from '../../domain/service/forgot-password.domain.service';
import { ForgotPasswordErrors } from '../../domain/value-object/forgot-password.errors';
import { EmailSender } from '../adapter/email.sender';
import { ForgotPasswordRepository } from '../adapter/forgot-password.repository';
import { ForgotPasswordAppServiceRequest } from './forgot-password.app.service.request';

@Injectable()
export class ForgotPasswordAppService {
  constructor(
    readonly repository: ForgotPasswordRepository,
    readonly emailSender: EmailSender,
  ) {}

  async invoke(request: ForgotPasswordAppServiceRequest): Promise<void> {
    const errors = new ForgotPasswordErrors();
    const domainservice = new ForgotPasswordDomainService();

    const user = await this.repository.getUserIdByEmail(request.email.val);
    const command = domainservice.invoke(user, errors);

    if (command === null) throw new BadRequestException(errors);

    await this.repository.saveResetPasswordToken(
      command.createResetPasswordToken,
    );
    await this.emailSender.send(command.sendResetPasswordEmail);
  }
}
