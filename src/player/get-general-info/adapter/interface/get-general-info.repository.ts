import { GeneralInfo } from '../../domain/entity/general-info';

export abstract class GetGeneralInfoRepository {
  abstract getGeneralInfoByUserId(userId: string): Promise<GeneralInfo | null>;
}
