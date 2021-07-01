import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResetPasswordRouteBodyRequest {
  @ApiProperty()
  @IsString()
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
