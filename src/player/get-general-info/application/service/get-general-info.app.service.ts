import { BadRequestException, Injectable } from '@nestjs/common';
import { GetGeneralInfoDomainService } from '../../domain/service/get-general-info.domain.service';
import { GetGeneralInfoErrors } from '../../domain/value-object/get-general-info.errors';
import { GetGeneralInfoRepository } from '../adapter/get-general-info.repository';
import { GetGeneralInfoAppServiceRequest } from './get-general-info.app.service.request';
import { GetGeneralInfoAppServiceResponse } from './get-general-info.app.service.response';

@Injectable()
export class GetGeneralInfoAppService {
  constructor(readonly repository: GetGeneralInfoRepository) {}

  async invoke(
    request: GetGeneralInfoAppServiceRequest,
  ): Promise<GetGeneralInfoAppServiceResponse> {
    const errors = new GetGeneralInfoErrors();
    const domainService = new GetGeneralInfoDomainService();

    const generalInfo = await this.repository.getGeneralInfoByUserId(
      request.userId.val,
    );
    domainService.invoke(generalInfo, errors);
    if (generalInfo === null) throw new BadRequestException(errors);

    return new GetGeneralInfoAppServiceResponse(generalInfo);
  }
}
