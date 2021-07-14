import { Experience } from '../../domain/entity/experience';
import { GeneralInfo } from '../../domain/entity/general-info';

export class GetGeneralInfoInteractorResponse {
  readonly gold: number;
  readonly level: number;
  readonly experience: GetGeneralInfoExperienceInteractorResponse;

  constructor(generalInfo: GeneralInfo) {
    this.level = generalInfo.experience.level;
    this.gold = generalInfo.gold;
    this.experience = new GetGeneralInfoExperienceInteractorResponse(
      generalInfo.experience,
    );
  }
}

export class GetGeneralInfoExperienceInteractorResponse {
  readonly current: number;
  readonly total: number;

  constructor(experience: Experience) {
    this.current = experience.current;
    this.total = experience.total;
  }
}
