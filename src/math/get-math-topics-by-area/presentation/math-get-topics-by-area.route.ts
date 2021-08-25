import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetMathTopicsByAreaInteractor } from '../adapter/interactor/get-math-topics-by-area.interactor';
import { GetMathTopicsByAreaInteractorRequest } from '../adapter/interactor/get-math-topics-by-area.interactor.request';
import { MathGetTopicsByAreaRouteErrors } from './math-get-topics-by-area.route.errors';
import { MathGetTopicsByAreaRouteParams } from './math-get-topics-by-area.route.params';
import { MathGetTopicsByAreaRouteResponse } from './math-get-topics-by-area.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('math')
@Controller('math')
export class MathGetTopicsByAreaRoute {
  constructor(readonly interactor: GetMathTopicsByAreaInteractor) {}

  @Get('areas/:areaId/topics')
  @ApiResponse({
    status: 200,
    type: MathGetTopicsByAreaRouteResponse,
    isArray: true,
  })
  @ApiResponse({ status: 400, type: MathGetTopicsByAreaRouteErrors })
  async route(
    @Param() params: MathGetTopicsByAreaRouteParams,
  ): Promise<MathGetTopicsByAreaRouteResponse[]> {
    const interactorRequest = GetMathTopicsByAreaInteractorRequest.parse(
      params.areaId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return interactorResponse.map((r) =>
      MathGetTopicsByAreaRouteResponse.fromInteractor(r),
    );
  }
}
