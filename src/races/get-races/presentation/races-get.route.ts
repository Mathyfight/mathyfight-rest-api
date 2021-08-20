import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetRacesInteractor } from '../adapter/interactor/get-races.interactor';
import { RacesGetRouteResponse } from './races-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('race')
@Controller('races')
export class RacesGetRoute {
  constructor(readonly interactor: GetRacesInteractor) {}

  @Get('races')
  @ApiResponse({ status: 200, type: RacesGetRouteResponse })
  async route(): Promise<RacesGetRouteResponse[]> {
    const intRes = await this.interactor.invoke();
    return intRes.map(
      (r) => new RacesGetRouteResponse(r.id, r.name, r.gender, r.imageUrl),
    );
  }
}
