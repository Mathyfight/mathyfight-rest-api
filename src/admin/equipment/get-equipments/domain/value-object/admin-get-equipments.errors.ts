import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminGetEquipmentsErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
