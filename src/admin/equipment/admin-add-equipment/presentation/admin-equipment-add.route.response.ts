import { ApiProperty } from '@nestjs/swagger';
import { AdminAddEquipmentInteractorResponse } from '../adapter/interactor/admin-add-equipment.interactor.response';

export class AdminEquipmentAddRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(res: AdminAddEquipmentInteractorResponse) {
    this.id = res.id;
    this.imageUrl = res.imageUrl;
  }
}
