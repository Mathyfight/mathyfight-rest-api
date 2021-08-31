import { ApiProperty } from '@nestjs/swagger';
import { AdminGetEquipmentsErrors } from '../domain/value-object/admin-get-equipments.errors';

export class AdminEquipmentsGetRouteErrors implements AdminGetEquipmentsErrors {
  @ApiProperty()
  userId!: string[];
}
