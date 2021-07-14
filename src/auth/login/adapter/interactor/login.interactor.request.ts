import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { LoginErrors } from '../../domain/value-object/login.errors';

export class LoginInteractorRequest {
  constructor(readonly username: Username, readonly password: Password) {}

  static parse(username: string, password: string): LoginInteractorRequest {
    const errors = new LoginErrors();
    const usernameV = Username.parse(
      username,
      errors,
      DomainErrorsProp.username,
    );
    const passwordV = Password.parse(
      password,
      errors,
      DomainErrorsProp.password,
    );

    if (usernameV === null || passwordV === null)
      throw new BadRequestException({ errors: errors });

    return new LoginInteractorRequest(usernameV, passwordV);
  }
}
