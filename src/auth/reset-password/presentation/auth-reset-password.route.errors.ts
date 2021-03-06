import { ApiProperty } from '@nestjs/swagger';
import { ResetPasswordErrors } from '../domain/value-object/reset-password.errors';

export class AuthResetPasswordRouteErrors implements ResetPasswordErrors {
  @ApiProperty()
  resetPasswordTokenId: string[] = [];

  @ApiProperty()
  password: string[] = [];
}
