import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class GetPlayerAvatarErrors implements Partial<DomainErrors> {
  userId: string[] = [];
}
