import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetEquipmentsErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
