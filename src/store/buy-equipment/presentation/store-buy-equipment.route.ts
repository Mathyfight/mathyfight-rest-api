import { Request, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { BuyEquipmentInteractor } from '../adapter/interactor/buy-equipment.interactor';
import { BuyEquipmentInteractorRequest } from '../adapter/interactor/buy-equipment.interactor.request';
import { StoreBuyEquipmentRouteErrors } from './store-buy-equipment.route.errors';
import { StoreBuyEquipmentRouteParams } from './store-buy-equipment.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('store')
@Controller('store')
export class StoreBuyEquipmentRoute {
  constructor(readonly buyEquipmentAppService: BuyEquipmentInteractor) {}

  @Post('equipments/:equipmentId/buy')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: StoreBuyEquipmentRouteErrors })
  async butEquipmentRoute(
    @Request() request: { user: JwtPayload },
    @Param() params: StoreBuyEquipmentRouteParams,
  ): Promise<void> {
    const serviceRequest = BuyEquipmentInteractorRequest.parse(
      request.user.userId,
      params.equipmentId,
    );
    await this.buyEquipmentAppService.invoke(serviceRequest);
  }
}
