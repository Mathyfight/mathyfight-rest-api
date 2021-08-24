import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetMathAreasInteractor } from '../adapter/interactor/get-math-areas.interactor';
import { MathGetAreasRouteResponse } from './math-get-areas.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('math')
@Controller('math')
export class MathGetAreasRoute {
  constructor(readonly interactor: GetMathAreasInteractor) {}

  @Get('areas')
  @ApiResponse({ status: 200, type: MathGetAreasRouteResponse, isArray: true })
  async route(): Promise<MathGetAreasRouteResponse[]> {
    const interactorResponse = await this.interactor.invoke();
    return interactorResponse.map((r) =>
      MathGetAreasRouteResponse.fromInteractor(r),
    );
  }
}
