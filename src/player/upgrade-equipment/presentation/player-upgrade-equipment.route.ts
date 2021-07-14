import { Controller, Param, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { UpgradeEquipmentInteractor } from '../adapter/interactor/upgrade-equipment.interactor';
import { UpgradeEquipmentInteractorRequest } from '../adapter/interactor/upgrade-equipment.interactor.request';
import { PlayerUpgradeEquipmentRouteErrors } from './player-upgrade-equipment.route.errors';
import { PlayerUpgradeEquipmentRouteParams } from './player-upgrade-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerUpgradeEquipmentRoute {
  constructor(readonly appService: UpgradeEquipmentInteractor) {}

  @Put('equipments/:equipmentId/upgrade')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerUpgradeEquipmentRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: PlayerUpgradeEquipmentRouteParams,
  ): Promise<void> {
    const serviceRequest = UpgradeEquipmentInteractorRequest.parse(
      request.user.userId,
      params.equipmentId,
    );
    await this.appService.invoke(serviceRequest);
  }
}
