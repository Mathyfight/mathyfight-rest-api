import { ApiProperty } from '@nestjs/swagger';
import { GetGeneralInfoAppServiceResponse } from '../application/service/get-general-info.app.service.response';

export class PlayerGetGeneralInfoExperienceRouteResponse {
  @ApiProperty()
  current: number;

  @ApiProperty()
  total: number;

  constructor(current: number, total: number) {
    this.current = current;
    this.total = total;
  }
}

export class PlayerGetGeneralInfoRouteResponse {
  @ApiProperty()
  gold: number;

  @ApiProperty()
  level: number;

  @ApiProperty({ type: PlayerGetGeneralInfoExperienceRouteResponse })
  experience: PlayerGetGeneralInfoExperienceRouteResponse;

  constructor(
    gold: number,
    level: number,
    experience: PlayerGetGeneralInfoExperienceRouteResponse,
  ) {
    this.gold = gold;
    this.level = level;
    this.experience = experience;
  }

  static fromServiceResponse(
    response: GetGeneralInfoAppServiceResponse,
  ): PlayerGetGeneralInfoRouteResponse {
    return new PlayerGetGeneralInfoRouteResponse(
      response.gold,
      response.level,
      new PlayerGetGeneralInfoExperienceRouteResponse(
        response.experience.current,
        response.experience.total,
      ),
    );
  }
}
