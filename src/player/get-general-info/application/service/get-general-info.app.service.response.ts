import { Experience } from '../../domain/entity/experience';
import { GeneralInfo } from '../../domain/entity/general-info';

export class GetGeneralInfoAppServiceResponse {
  readonly gold: number;
  readonly level: number;
  readonly experience: GetGeneralInfoExperienceAppServiceResponse;

  constructor(generalInfo: GeneralInfo) {
    this.level = generalInfo.experience.level;
    this.gold = generalInfo.gold;
    this.experience = new GetGeneralInfoExperienceAppServiceResponse(
      generalInfo.experience,
    );
  }
}

export class GetGeneralInfoExperienceAppServiceResponse {
  readonly current: number;
  readonly total: number;

  constructor(experience: Experience) {
    this.current = experience.current;
    this.total = experience.total;
  }
}
