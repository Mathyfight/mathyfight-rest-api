import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsErrors } from '../domain/value-object/get-equipments.errors';

export class PlayerGetEquipmentsRouteErrors implements GetEquipmentsErrors {
  @ApiProperty()
  userId: string[] = [];
}
