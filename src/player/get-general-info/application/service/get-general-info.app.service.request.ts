import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetGeneralInfoErrors } from '../../domain/value-object/get-general-info.errors';

export class GetGeneralInfoAppServiceRequest {
  constructor(readonly userId: Uuid) {}

  static parse(userId: string): GetGeneralInfoAppServiceRequest {
    const errors = new GetGeneralInfoErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    if (userIdV === null) throw new BadRequestException(errors);

    return new GetGeneralInfoAppServiceRequest(userIdV);
  }
}
