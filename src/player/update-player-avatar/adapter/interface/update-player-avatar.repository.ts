import { UpdatePlayerAvatarCommand } from '../../domain/command/update-player-avatar.command';
import { Race } from '../../domain/entity/race';
import { User } from '../../domain/entity/user';

export abstract class UpdatePlayerAvatarRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getRaceById(raceId: string): Promise<Race | null>;
  abstract updatePlayerAvatar(cmd: UpdatePlayerAvatarCommand): Promise<void>;
}
