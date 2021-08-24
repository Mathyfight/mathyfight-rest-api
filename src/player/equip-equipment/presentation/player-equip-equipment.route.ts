import { Controller, UseGuards, Request, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { EquipEquipmentInteractor } from '../adapter/interactor/equip-equipment.interactor';
import { EquipEquipmentInteractorRequest } from '../adapter/interactor/equip-equipment.interactor.request';
import { PlayerEquipEquipmentRouteBody } from './player-equip-equipment.route.body';
import { PlayerEquipEquipmentRouteErrors } from './player-equip-equipment.route.errors';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerEquipEquipmentRoute {
  constructor(readonly interactor: EquipEquipmentInteractor) {}

  @Put('equip')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerEquipEquipmentRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Body() body: PlayerEquipEquipmentRouteBody,
  ): Promise<void> {
    const intRequest = EquipEquipmentInteractorRequest.parse(
      body.equipmentId,
      request.user.userId,
      body.type,
    );
    await this.interactor.invoke(intRequest);
  }
}
