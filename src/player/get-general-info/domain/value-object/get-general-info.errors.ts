import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetGeneralInfoErrors implements Partial<DomainErrors> {
  userId: string[];

  constructor() {
    this.userId = [];
  }
}
