import { ApiProperty } from '@nestjs/swagger';
import { RegisterErrors } from '../domain/value-object/register.errors';

export class AuthRegisterRouteErrors implements RegisterErrors {
  @ApiProperty()
  username: string[];

  @ApiProperty()
  password: string[];

  @ApiProperty()
  email: string[];

  constructor() {
    this.email = [];
    this.password = [];
    this.username = [];
  }
}
