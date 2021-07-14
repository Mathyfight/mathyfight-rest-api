import { GeneralInfo } from '../entity/general-info';
import { GetGeneralInfoErrors } from '../value-object/get-general-info.errors';

export class GetGeneralInfoCommand {
  static readonly playerDoesNotExist = 'debe tener jugador';

  private constructor(readonly generalInfo: GeneralInfo) {}

  static new(
    generalInfo: GeneralInfo | null,
    errors: GetGeneralInfoErrors,
  ): GetGeneralInfoCommand | null {
    if (generalInfo === null) {
      errors.userId.push(this.playerDoesNotExist);
      return null;
    }
    return new GetGeneralInfoCommand(generalInfo);
  }
}
