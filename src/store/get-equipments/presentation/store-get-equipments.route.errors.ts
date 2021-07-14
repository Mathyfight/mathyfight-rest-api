import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsErrors } from '../domain/value-object/get-equipments.errors';

export class StoreGetEquipmentsRouteErrors implements GetEquipmentsErrors {
  @ApiProperty()
  userId: string[] = [];
}
