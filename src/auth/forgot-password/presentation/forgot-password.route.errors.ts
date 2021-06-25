import { ApiProperty } from '@nestjs/swagger';
import { ForgotPasswordErrors } from '../domain/value-object/forgot-password.errors';

export class ForgotPasswordRouteErrors implements ForgotPasswordErrors {
  @ApiProperty()
  email: string[];

  private constructor() {
    this.email = [];
  }
}
