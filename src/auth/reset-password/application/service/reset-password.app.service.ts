import { BadRequestException, Injectable } from '@nestjs/common';
import { ResetPasswordDomainService } from '../../domain/service/reset-password.domain.service';
import { ResetPasswordErrors } from '../../domain/value-object/reset-password.errors';
import { ResetPasswordRepository } from '../adapter/reset-password.repository';
import { ResetPasswordAppServiceRequest } from './reset-password.app.service.request';

@Injectable()
export class ResetPasswordAppService {
  constructor(readonly repository: ResetPasswordRepository) {}

  async invoke(request: ResetPasswordAppServiceRequest): Promise<void> {
    const errors = new ResetPasswordErrors();
    const domainService = new ResetPasswordDomainService();

    const token = await this.repository.getTokenById(
      request.resetPasswordTokenId.val,
    );

    const command = domainService.invoke(token, request.password.val, errors);
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.disableToken(command.disableToken);
    await this.repository.changeUserPassword(command.changeUserPassword);
  }
}
