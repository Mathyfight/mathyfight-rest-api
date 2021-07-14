import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResetPasswordRouteBody {
  @ApiProperty()
  @IsString()
  readonly password: string = '';
}
