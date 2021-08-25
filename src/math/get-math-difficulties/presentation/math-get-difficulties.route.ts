import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetMathDifficultiesInteractor } from '../adapter/interactor/get-math-difficulties.interactor';
import { MathGetDifficultiesRouteResponse } from './math-get-difficulties.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('math')
@Controller('math')
export class MathGetDifficultiesRoute {
  constructor(readonly interactor: GetMathDifficultiesInteractor) {}

  @Get('difficulties')
  @ApiResponse({ status: 200, type: [MathGetDifficultiesRouteResponse] })
  async route(): Promise<MathGetDifficultiesRouteResponse[]> {
    const interactorResponse = await this.interactor.invoke();
    return interactorResponse.map(
      (r) => new MathGetDifficultiesRouteResponse(r),
    );
  }
}
