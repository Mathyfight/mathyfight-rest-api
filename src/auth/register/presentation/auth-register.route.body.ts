import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRegisterRouteBody {
  @ApiProperty()
  @IsString()
  readonly username: string = '';

  @ApiProperty()
  @IsString()
  readonly password: string = '';

  @ApiProperty()
  @IsString()
  readonly email: string = '';
}
