import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetPlayerStatisticsErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
