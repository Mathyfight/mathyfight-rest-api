import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordRouteParamsRequest {
  @ApiProperty()
  @IsString()
  resetPasswordTokenId: string;

  constructor(resetPasswordId: string) {
    this.resetPasswordTokenId = resetPasswordId;
  }
}
