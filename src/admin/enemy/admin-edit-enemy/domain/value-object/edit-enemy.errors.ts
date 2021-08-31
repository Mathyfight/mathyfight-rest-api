import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class EditEnemyErrors implements Partial<DomainErrors> {
  name: string[] = [];
  image: string[] = [];
  userId: string[] = [];
}
