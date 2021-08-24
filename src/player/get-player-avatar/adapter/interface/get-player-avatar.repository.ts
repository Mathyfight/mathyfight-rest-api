import { User } from '../../domain/entity/user';

export abstract class GetPlayerAvatarRepository {
  abstract getAvatarByUserId(userId: string): Promise<User | null>;
}
