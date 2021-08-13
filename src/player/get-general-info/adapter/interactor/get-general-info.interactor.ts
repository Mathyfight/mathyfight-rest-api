import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetGeneralInfoCommand } from '../../domain/command/get-general-info.command';
import { GetGeneralInfoErrors } from '../../domain/value-object/get-general-info.errors';
import { GetGeneralInfoRepository } from '../interface/get-general-info.repository';
import { GetGeneralInfoInteractorRequest } from './get-general-info.interactor.request';
import { GetGeneralInfoInteractorResponse } from './get-general-info.interactor.response';

@Injectable()
export class GetGeneralInfoInteractor {
  constructor(readonly repository: GetGeneralInfoRepository) {}

  async invoke(
    request: GetGeneralInfoInteractorRequest,
  ): Promise<GetGeneralInfoInteractorResponse> {
    const errors = new GetGeneralInfoErrors();

    const generalInfo = await this.repository.getGeneralInfoByUserId(
      request.userId.val,
    );
    const cmd = GetGeneralInfoCommand.new(generalInfo, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new GetGeneralInfoInteractorResponse(cmd.generalInfo);
  }
}
