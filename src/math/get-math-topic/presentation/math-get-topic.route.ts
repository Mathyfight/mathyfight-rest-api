import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetMathTopicInteractor } from '../adapter/interactor/get-math-topic.interactor';
import { GetMathTopicInteractorRequest } from '../adapter/interactor/get-math-topic.interactor.request';
import { MathGetTopicRouteErrors } from './math-get-topic.route.errors';
import { MathGetTopicRouteParams } from './math-get-topic.route.params';
import { MathGetTopicRouteResponse } from './math-get-topic.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('math')
@Controller('math')
export class MathGetTopicRoute {
  constructor(readonly interactor: GetMathTopicInteractor) {}

  @Get('topics/:topicId')
  @ApiResponse({ status: 200, type: MathGetTopicRouteResponse })
  @ApiResponse({ status: 400, type: MathGetTopicRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: MathGetTopicRouteParams,
  ): Promise<MathGetTopicRouteResponse> {
    const interactorRequest = GetMathTopicInteractorRequest.parse(
      params.topicId,
      request.user.userId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new MathGetTopicRouteResponse(interactorResponse);
  }
}
