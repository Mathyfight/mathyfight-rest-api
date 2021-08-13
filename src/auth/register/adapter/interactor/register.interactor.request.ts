import { Email } from 'src/auth/core/domain/value-object/email';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { RegisterErrors } from '../../domain/value-object/register.errors';

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
    const errors = new RegisterErrors();
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
      throw new ValidationException(errors);

    return new RegisterInteractorRequest(usernameV, passwordV, emailV);
  }
}
