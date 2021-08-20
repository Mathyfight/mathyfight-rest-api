import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class UpdatePlayerAvatarErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  color: string[] = [];
  raceId: string[] = [];
  errors: string[] = [];
}
