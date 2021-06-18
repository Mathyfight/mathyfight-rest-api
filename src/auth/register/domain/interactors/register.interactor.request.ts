import { BadRequestException } from '@nestjs/common';
import { Email } from 'src/auth/core/domain/value-objects/email';
import { Password } from 'src/auth/core/domain/value-objects/password';
import { Username } from 'src/auth/core/domain/value-objects/username';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';

export class RegisterInteractorRequest {
  constructor(
    readonly username: Username,
    readonly password: Password,
    readonly email: Email,
  ) {}

  static parse(
    username: string,
    password: string,
    email: string,
  ): RegisterInteractorRequest {
    const errors = new DomainErrors();
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
    const emailV = Email.parse(email, errors, DomainErrorsProp.email);
    if (usernameV === null || passwordV === null || emailV === null)
      throw new BadRequestException(errors);
    return new RegisterInteractorRequest(usernameV, passwordV, emailV);
  }
}
