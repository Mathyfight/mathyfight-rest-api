import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/shared/domain/value-objects/auth/password';
import { Username } from 'src/shared/domain/value-objects/auth/username';
import { Email } from 'src/shared/domain/value-objects/general/email';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';

export class RegisterInteractorRequest {
  constructor(
    private username: Username,
    private password: Password,
    private email: Email,
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
