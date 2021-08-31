import { ApiProperty } from '@nestjs/swagger';
import { AdminEditEquipmentInteractorResponse } from '../adapter/interactor/admin-edit-equipment.interactor.response';

export class AdminEquipmentEditRouteResponse {
  @ApiProperty({ type: String })
  readonly imageUrl: string | null;

  constructor(res: AdminEditEquipmentInteractorResponse) {
    this.imageUrl = res.imageUrl;
  }
}
