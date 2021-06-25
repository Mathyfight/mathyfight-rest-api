import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordRouteBodyRequest {
  @ApiProperty()
  @IsString()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
