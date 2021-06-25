import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsErrors } from '../domain/value-object/get-equipments.errors';

export class GetEquipmentsRouteErrors implements GetEquipmentsErrors {
  @ApiProperty()
  userId: string[];

  constructor() {
    this.userId = [];
  }
}
