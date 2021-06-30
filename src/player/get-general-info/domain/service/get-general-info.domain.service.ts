import { GeneralInfo } from '../entity/general-info';
import { GetGeneralInfoErrors } from '../value-object/get-general-info.errors';

export class GetGeneralInfoDomainService {
  playerDoesNotExist = 'debe tener jugador';

  invoke(generalInfo: GeneralInfo | null, errors: GetGeneralInfoErrors): void {
    if (generalInfo === null) errors.userId.push(this.playerDoesNotExist);
  }
}
