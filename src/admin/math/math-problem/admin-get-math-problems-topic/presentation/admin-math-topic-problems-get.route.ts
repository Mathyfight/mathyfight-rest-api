import { Controller, Request, Get, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminGetMathProblemsByTopicInteractor } from '../adapter/interactor/admin-get-math-problems-by-topic.interactor';
import { AdminGetMathProblemsByTopicInteractorRequest } from '../adapter/interactor/admin-get-math-problems-by-topic.interactor.request';
import { AdminMathTopicProblemsGetRouteErrors } from './admin-math-topic-problems-get.route.errors';
import { AdminMathTopicProblemsGetRouteParams } from './admin-math-topic-problems-get.route.params';
import { AdminMathTopicProblemsGetRouteResponse } from './admin-math-topic-problems-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.problem')
@Controller()
export class AdminMathTopicProblemsGetRoute {
  constructor(readonly interactor: AdminGetMathProblemsByTopicInteractor) {}

  @Get('admin/math/topics/:mathTopicId/problems')
  @ApiResponse({ status: 200, type: [AdminMathTopicProblemsGetRouteResponse] })
  @ApiResponse({ status: 400, type: AdminMathTopicProblemsGetRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: AdminMathTopicProblemsGetRouteParams,
  ): Promise<AdminMathTopicProblemsGetRouteResponse[]> {
    const intReq = AdminGetMathProblemsByTopicInteractorRequest.parse(
      request.user.userId,
      params.mathTopicId,
    );
    const intRes = await this.interactor.invoke(intReq);
    return intRes.map((r) => new AdminMathTopicProblemsGetRouteResponse(r));
  }
}
