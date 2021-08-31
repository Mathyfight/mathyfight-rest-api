import { Controller, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminDeleteMathTopicInteractor } from '../adapter/interactor/admin-delete-math-topic.interactor';
import { AdminDeleteMathTopicInteractorRequest } from '../adapter/interactor/admin-delete-math-topic.interactor.request';
import { AdminMathDeleteTopicRouteErrors } from './admin-math-delete-topic.route.errors';
import { AdminMathDeleteTopicRouteParams } from './admin-math-delete-topic.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.topic')
@Controller()
export class AdminMathDeleteTopicRoute {
  constructor(readonly interactor: AdminDeleteMathTopicInteractor) {}

  @Delete('admin/math/topics/:topicId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: AdminMathDeleteTopicRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: AdminMathDeleteTopicRouteParams,
  ): Promise<void> {
    const intReq = AdminDeleteMathTopicInteractorRequest.parse(
      request.user.userId,
      params.topicId,
    );
    await this.interactor.invoke(intReq);
  }
}
