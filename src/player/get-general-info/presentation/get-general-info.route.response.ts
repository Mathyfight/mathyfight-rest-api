import { ApiProperty } from '@nestjs/swagger';
import { GetGeneralInfoAppServiceResponse } from '../application/service/get-general-info.app.service.response';

export class GetGeneralInfoExperienceRouteResponse {
  @ApiProperty()
  current: number;

  @ApiProperty()
  total: number;

  constructor(current: number, total: number) {
    this.current = current;
    this.total = total;
  }
}

export class GetGeneralInfoRouteResponse {
  @ApiProperty()
  gold: number;

  @ApiProperty()
  level: number;

  @ApiProperty({ type: GetGeneralInfoExperienceRouteResponse })
  experience: GetGeneralInfoExperienceRouteResponse;

  constructor(
    gold: number,
    level: number,
    experience: GetGeneralInfoExperienceRouteResponse,
  ) {
    this.gold = gold;
    this.level = level;
    this.experience = experience;
  }

  static fromServiceResponse(
    response: GetGeneralInfoAppServiceResponse,
  ): GetGeneralInfoRouteResponse {
    return new GetGeneralInfoRouteResponse(
      response.gold,
      response.level,
      new GetGeneralInfoExperienceRouteResponse(
        response.experience.current,
        response.experience.total,
      ),
    );
  }
}
