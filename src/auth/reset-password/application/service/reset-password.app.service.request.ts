import { BadRequestException } from '@nestjs/common';
import { Password } from 'src/auth/core/domain/value-object/password';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { ResetPasswordErrors } from '../../domain/value-object/reset-password.errors';

export class ResetPasswordAppServiceRequest {
  constructor(public resetPasswordTokenId: Uuid, public password: Password) {}

  static parse(
    resetPasswordId: string,
    password: string,
  ): ResetPasswordAppServiceRequest {
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
      throw new BadRequestException(errors);

    return new ResetPasswordAppServiceRequest(resetPasswordIdV, passwordV);
  }
}
