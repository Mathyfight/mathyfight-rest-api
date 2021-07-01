import { ApiProperty } from '@nestjs/swagger';
import { GetGeneralInfoErrors } from '../domain/value-object/get-general-info.errors';

export class PlayerGetGeneralInfoRouteErrors implements GetGeneralInfoErrors {
  @ApiProperty()
  userId: string[];

  constructor() {
    this.userId = [];
  }
}
