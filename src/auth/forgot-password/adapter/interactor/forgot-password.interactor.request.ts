import { BadRequestException } from '@nestjs/common';
import { Email } from 'src/auth/core/domain/value-object/email';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { ForgotPasswordErrors } from '../../domain/value-object/forgot-password.errors';

export class ForgotPasswordInteractorRequest {
  constructor(readonly email: Email) {}

  static parse(email: string): ForgotPasswordInteractorRequest {
    const errors = new ForgotPasswordErrors();
    const emailV = Email.parse(email, errors, DomainErrorsProp.email);

    if (emailV === null) throw new BadRequestException({ errors: errors });

    return new ForgotPasswordInteractorRequest(emailV);
  }
}