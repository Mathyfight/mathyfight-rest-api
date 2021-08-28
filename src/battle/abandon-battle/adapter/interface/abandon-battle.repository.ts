import { AbandonBattleCommand } from '../../domain/command/abandon-battle.command';
import { Avatar } from '../../domain/entity/avatar';
import { Battle } from '../../domain/entity/battle';

export abstract class AbandonBattleRepository {
  abstract getAvatarByUserId(userId: string): Promise<Avatar | null>;
  abstract getBattleById(id: string): Promise<Battle | null>;
  abstract abandonBattle(cmd: AbandonBattleCommand): Promise<void>;
}
