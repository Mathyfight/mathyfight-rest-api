import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminGetEquipmentsInteractor } from '../adapter/interactor/admin-get-equipments.interactor';
import { AdminGetEquipmentsInteractorRequest } from '../adapter/interactor/admin-get-equipments.interactor.request';
import { AdminEquipmentsGetRouteErrors } from './admin-equipments-get.route.errors';
import { AdminEquipmentsGetRouteQueries } from './admin-equipments-get.route.queries';
import { AdminEquipmentsGetRouteResponse } from './admin-equipments-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.equipment')
@Controller()
export class AdminEquipmentsGetRoute {
  constructor(readonly interactor: AdminGetEquipmentsInteractor) {}

  @Get('admin/equipments')
  @ApiResponse({ status: 200, type: AdminEquipmentsGetRouteResponse })
  @ApiResponse({ status: 400, type: AdminEquipmentsGetRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Query() queries: AdminEquipmentsGetRouteQueries,
  ): Promise<AdminEquipmentsGetRouteResponse[]> {
    const intReq = AdminGetEquipmentsInteractorRequest.parse(
      request.user.userId,
      queries.equipmentType,
    );
    const intRes = this.interactor.invoke(intReq);
    return (await intRes).map((r) => new AdminEquipmentsGetRouteResponse(r));
  }
}
