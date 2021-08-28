import { Avatar } from './avatar';

export class Battle {
  constructor(
    readonly avatar: Avatar,
    readonly enemyCurrentHealth: number,
    readonly enemyCurrentDefense: number,
    readonly nextLevelId: string | null,
    readonly experienceToGain: number,
  ) {}

  readonly playerWon = this.enemyCurrentHealth === 0;
}
