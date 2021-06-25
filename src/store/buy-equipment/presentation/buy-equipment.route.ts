import { Request, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { BuyEquipmentAppService } from '../application/service/buy-equipment.app.service';
import { BuyEquipmentAppServiceRequest } from '../application/service/buy-equipment.app.service.request';
import { BuyEquipmentRouteErrors } from './buy-equipment.route.errors';
import { BuyEquipmentRouteParamsRequest } from './buy-equipment.route.params.request';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('store')
@Controller('store')
export class BuyEquipmentRoute {
  constructor(readonly buyEquipmentAppService: BuyEquipmentAppService) {}

  @Post('equipments/:equipmentId/buy')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: BuyEquipmentRouteErrors })
  async butEquipmentRoute(
    @Request() request: { user: JwtPayload },
    @Param() params: BuyEquipmentRouteParamsRequest,
  ): Promise<void> {
    const serviceRequest = BuyEquipmentAppServiceRequest.parse(
      request.user.userId,
      params.equipmentId,
    );
    await this.buyEquipmentAppService.invoke(serviceRequest);
  }
}
