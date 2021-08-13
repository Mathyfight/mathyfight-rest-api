import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { ResetPasswordErrors } from '../../domain/value-object/reset-password.errors';

export class ResetPasswordInteractorRequest {
  constructor(public resetPasswordTokenId: Uuid, public password: Password) {}

  static parse(
    resetPasswordId: string,
    password: string,
  ): ResetPasswordInteractorRequest {
    const errors = new ResetPasswordErrors();
    const resetPasswordIdV = Uuid.parse(
      resetPasswordId,
      errors,
      DomainErrorsProp.resetPasswordTokenId,
    );
    const passwordV = Password.parse(
      password,
      errors,
      DomainErrorsProp.password,
    );

    if (resetPasswordIdV === null || passwordV === null)
      throw new ValidationException(errors);

    return new ResetPasswordInteractorRequest(resetPasswordIdV, passwordV);
  }
}
