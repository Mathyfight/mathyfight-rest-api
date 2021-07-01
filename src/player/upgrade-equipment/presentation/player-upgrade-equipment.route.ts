import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { UpgradeEquipmentAppService } from '../application/service/upgrade-equipment.app.service';
import { UpgradeEquipmentAppServiceRequest } from '../application/service/upgrade-equipment.app.service.request';
import { PlayerUpgradeEquipmentRouteErrors } from './player-upgrade-equipment.route.errors';
import { PlayerUpgradeEquipmentRouteParams } from './player-upgrade-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerUpgradeEquipmentRoute {
  constructor(readonly appService: UpgradeEquipmentAppService) {}

  @Put('equipments/:equipmentId/upgrade')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerUpgradeEquipmentRouteErrors })
  async route(
    @Param() params: PlayerUpgradeEquipmentRouteParams,
  ): Promise<void> {
    const serviceRequest = UpgradeEquipmentAppServiceRequest.parse(
      params.equipmentId,
    );
    await this.appService.invoke(serviceRequest);
  }
}
