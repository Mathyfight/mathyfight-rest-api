import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterRepository } from '../interface/register.repository';
import { RegisterInteractorRequest } from './register.interactor.request';
import { RegisterErrors } from '../../domain/value-object/register.errors';
import { RegisterCommand } from '../../domain/command/register.command';

@Injectable()
export class RegisterInteractor {
  constructor(readonly repository: RegisterRepository) {}

  async invoke(request: RegisterInteractorRequest): Promise<void> {
    const errors = new RegisterErrors();

    const userIdFromUsername = await this.repository.getOneUserIdByUsername(
      request.username.val,
    );
    const userIdFromEmail = await this.repository.getOneUserIdByEmail(
      request.email.val,
    );

    const command = RegisterCommand.new(
      userIdFromUsername,
      userIdFromEmail,
      request.password.val,
      request.username.val,
      request.email.val,
      errors,
    );
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.registerNewUser(command);
  }
}
