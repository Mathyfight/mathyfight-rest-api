import { Avatar } from './avatar';
import { UnlockedLevel } from './unlocked-level';

export class User {
  constructor(
    readonly avatar: Avatar | null,
    readonly unlockedLevels: UnlockedLevel[],
  ) {}
}
