import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetPlayerProfileErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
