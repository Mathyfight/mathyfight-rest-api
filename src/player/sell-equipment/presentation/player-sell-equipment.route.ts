import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { SellEquipmentAppService } from '../application/service/sell-equipment.app.service';
import { SellEquipmentAppServiceRequest } from '../application/service/sell-equipment.app.service.request';
import { PlayerSellEquipmentRouteErrors } from './player-sell-equipment.route.errors';
import { PlayerSellEquipmentRouteParams } from './player-sell-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerSellEquipmentRoute {
  constructor(readonly appService: SellEquipmentAppService) {}

  @Put('equipments/:equipmentId/sell')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerSellEquipmentRouteErrors })
  async route(@Param() params: PlayerSellEquipmentRouteParams): Promise<void> {
    const serviceRequest = SellEquipmentAppServiceRequest.parse(
      params.equipmentId,
    );
    await this.appService.invoke(serviceRequest);
  }
}
