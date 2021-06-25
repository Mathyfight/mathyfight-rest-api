import { ApiProperty } from '@nestjs/swagger';
import { ResetPasswordErrors } from '../domain/value-object/reset-password.errors';

export class ResetPasswordRouteErrors implements ResetPasswordErrors {
  @ApiProperty()
  resetPasswordTokenId: string[];

  @ApiProperty()
  password: string[];

  private constructor() {
    this.resetPasswordTokenId = [];
    this.password = [];
  }
}
