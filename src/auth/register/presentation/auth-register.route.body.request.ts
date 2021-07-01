import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRegisterRouteBodyRequest {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
