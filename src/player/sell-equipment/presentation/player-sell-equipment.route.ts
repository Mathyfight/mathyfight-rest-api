import { Controller, Param, Put, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { SellEquipmentInteractor } from '../adapter/interactor/sell-equipment.interactor';
import { SellEquipmentInteractorRequest } from '../adapter/interactor/sell-equipment.interactor.request';
import { PlayerSellEquipmentRouteErrors } from './player-sell-equipment.route.errors';
import { PlayerSellEquipmentRouteParams } from './player-sell-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerSellEquipmentRoute {
  constructor(readonly appService: SellEquipmentInteractor) {}

  @Put('equipments/:equipmentId/sell')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerSellEquipmentRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: PlayerSellEquipmentRouteParams,
  ): Promise<void> {
    const serviceRequest = SellEquipmentInteractorRequest.parse(
      request.user.userId,
      params.equipmentId,
    );
    await this.appService.invoke(serviceRequest);
  }
}
