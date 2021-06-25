import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordRouteErrors {
  @ApiProperty()
  email: string[];
  @ApiProperty()
  errors: string[];

  private constructor(email: string[], errors: string[]) {
    this.email = email;
    this.errors = errors;
  }
}
