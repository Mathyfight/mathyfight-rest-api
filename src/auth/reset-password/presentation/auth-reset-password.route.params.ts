import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResetPasswordRouteParams {
  @ApiProperty()
  @IsString()
  readonly resetPasswordTokenId: string = '';
}
