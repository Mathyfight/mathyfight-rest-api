import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { SellEquipmentAppService } from '../application/service/sell-equipment.app.service';
import { SellEquipmentAppServiceRequest } from '../application/service/sell-equipment.app.service.request';
import { SellEquipmentRouteErrors } from './sell-equipment.route.errors';
import { SellEquipmentRouteParams } from './sell-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class SellEquipmentRoute {
  constructor(readonly appService: SellEquipmentAppService) {}

  @Put('equipments/:equipmentId/sell')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: SellEquipmentRouteErrors })
  async route(@Param() params: SellEquipmentRouteParams): Promise<void> {
    const serviceRequest = SellEquipmentAppServiceRequest.parse(
      params.equipmentId,
    );
    await this.appService.invoke(serviceRequest);
  }
}
