import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminGetMathProblemInteractor } from '../adapter/interactor/admin-get-math-problem.interactor';
import { AdminGetMathProblemInteractorRequest } from '../adapter/interactor/admin-get-math-problem.interactor.request';
import { AdminMathProblemGetRouteErrors } from './admin-math-problem-get.route.errors';
import { AdminMathProblemGetRouteParams } from './admin-math-problem-get.route.params';
import { AdminMathProblemGetRouteResponse } from './admin-math-problem-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.problem')
@Controller()
export class AdminMathProblemGetRoute {
  constructor(readonly interactor: AdminGetMathProblemInteractor) {}

  @Get('admin/math/problems/:mathProblemId')
  @ApiResponse({ status: 200, type: [AdminMathProblemGetRouteResponse] })
  @ApiResponse({ status: 400, type: AdminMathProblemGetRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: AdminMathProblemGetRouteParams,
  ): Promise<AdminMathProblemGetRouteResponse> {
    const intReq = AdminGetMathProblemInteractorRequest.parse(
      request.user.userId,
      params.mathProblemId,
    );
    const intRes = await this.interactor.invoke(intReq);
    return new AdminMathProblemGetRouteResponse(intRes);
  }
}
