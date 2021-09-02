import { Controller, Request, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminGetMathTopicInteractor } from '../adapter/interactor/admin-get-math-topic.interactor';
import { AdminGetMathTopicInteractorRequest } from '../adapter/interactor/admin-get-math-topic.interactor.request';
import { AdminMathTopicGetRouteErrors } from './admin-math-topic-get.route.errors';
import { AdminMathTopicGetRouteParams } from './admin-math-topic-get.route.params';
import { AdminMathTopicGetRouteResponse } from './admin-math-topic-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.topic')
@Controller()
export class AdminMathTopicGetRoute {
  constructor(readonly interactor: AdminGetMathTopicInteractor) {}

  @Get('admin/math/topics/:mathTopicId')
  @ApiResponse({ status: 200, type: AdminMathTopicGetRouteResponse })
  @ApiResponse({ status: 400, type: AdminMathTopicGetRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: AdminMathTopicGetRouteParams,
  ): Promise<AdminMathTopicGetRouteResponse> {
    const intReq = AdminGetMathTopicInteractorRequest.parse(
      request.user.userId,
      params.mathTopicId,
    );
    const intRes = await this.interactor.invoke(intReq);
    return new AdminMathTopicGetRouteResponse(intRes);
  }
}
