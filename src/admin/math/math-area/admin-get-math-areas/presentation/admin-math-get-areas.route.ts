import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminGetMathAreasInteractor } from '../adapter/interactor/admin-get-math-areas.interactor';
import { AdminGetMathAreasInteractorRequest } from '../adapter/interactor/admin-get-math-areas.interactor.request';
import { AdminMathGetAreasRouteErrors } from './admin-math-get-areas.route.errors';
import { AdminMathGetAreasRouteResponse } from './admin-math-get-areas.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.area')
@Controller()
export class AdminMathGetAreasRoute {
  constructor(readonly interactor: AdminGetMathAreasInteractor) {}

  @Get('admin/math/areas')
  @ApiResponse({ status: 200, type: [AdminMathGetAreasRouteResponse] })
  @ApiResponse({ status: 400, type: AdminMathGetAreasRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
  ): Promise<AdminMathGetAreasRouteResponse[]> {
    const intReq = AdminGetMathAreasInteractorRequest.parse(
      request.user.userId,
    );
    const intRes = await this.interactor.invoke(intReq);
    return intRes.map((r) => new AdminMathGetAreasRouteResponse(r));
  }
}
