import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResetPasswordRouteParamsRequest {
  @ApiProperty()
  @IsString()
  resetPasswordTokenId: string;

  constructor(resetPasswordId: string) {
    this.resetPasswordTokenId = resetPasswordId;
  }
}
