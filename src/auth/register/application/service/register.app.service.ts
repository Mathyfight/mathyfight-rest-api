import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterRepository } from '../adapter/register.repository';
import { RegisterAppServiceRequest } from './register.app.service.request';
import { RegisterDomainService } from '../../domain/service/register.domain.service';
import { RegisterErrors } from '../../domain/value-object/register.errors';

@Injectable()
export class RegisterAppService {
  constructor(readonly repository: RegisterRepository) {}

  async invoke(request: RegisterAppServiceRequest): Promise<void> {
    const errors = new RegisterErrors();
    const domainService = new RegisterDomainService();

    const userIdFromUsername = await this.repository.getOneUserIdByUsername(
      request.username.val,
    );
    const userIdFromEmail = await this.repository.getOneUserIdByEmail(
      request.email.val,
    );

    const command = domainService.invoke(
      userIdFromUsername,
      userIdFromEmail,
      request.password.val,
      request.username.val,
      request.email.val,
      errors,
    );
    if (command === null) throw new BadRequestException(errors);

    await this.repository.saveNewUser(command.registerNewUser);
  }
}
