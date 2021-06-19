import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRouteBodyRequest {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
