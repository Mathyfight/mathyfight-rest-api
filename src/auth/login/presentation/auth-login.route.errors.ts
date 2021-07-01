import { ApiProperty } from '@nestjs/swagger';
import { LoginErrors } from '../domain/value-object/login.errors';

export class AuthLoginRouteErrors implements LoginErrors {
  @ApiProperty()
  username: string[];

  @ApiProperty()
  password: string[];

  @ApiProperty()
  errors: string[];

  private constructor() {
    this.errors = [];
    this.password = [];
    this.username = [];
  }
}
