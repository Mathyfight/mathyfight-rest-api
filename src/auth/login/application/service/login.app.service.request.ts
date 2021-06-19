import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';

export class LoginAppServiceRequest {
  constructor(readonly username: Username, readonly password: Password) {}

  static parse(username: string, password: string): LoginAppServiceRequest {
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

    if (usernameV === null || passwordV === null)
      throw new BadRequestException(errors);

    return new LoginAppServiceRequest(usernameV, passwordV);
  }
}
