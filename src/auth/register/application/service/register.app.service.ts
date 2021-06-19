import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { RegisterRepository } from '../adapter/register.repository';
import { User } from '../../domain/entity/user';
import { RegisterAppServiceRequest } from './register.app.service.request';
import { HashedPassword } from 'src/auth/core/domain/value-object/hashed-password';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { Email } from 'src/auth/core/domain/value-object/email';
import { RegisterDomainService } from '../../domain/service/register.domain.service';

@Injectable()
export class RegisterAppService {
  constructor(readonly repository: RegisterRepository) {}

  async invoke(request: RegisterAppServiceRequest): Promise<void> {
    const errors = new DomainErrors();
    const domainService = new RegisterDomainService();

    const userIdFromUsername = await this.repository.getOneUserIdByUsername(
      request.username,
    );
    domainService.validateUniqueUsername(userIdFromUsername, errors);

    const userIdFromEmail = await this.repository.getOneUserIdByEmail(
      request.email,
    );
    domainService.validateUniqueEmail(userIdFromEmail, errors);

    if (errors.isNotEmpty) throw new BadRequestException(errors);

    await this.saveNewUser(request.password, request.username, request.email);
  }

  async saveNewUser(
    password: Password,
    username: Username,
    email: Email,
  ): Promise<void> {
    const hashedPassword = await HashedPassword.new(password);
    const newUser = User.new(username, hashedPassword, email);
    await this.repository.saveNewUser(newUser);
  }
}
