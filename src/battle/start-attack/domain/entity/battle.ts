export class Battle {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly mathProblemsIdsUsed: string[],
    readonly playerHealth: number,
    readonly playerDefense: number,
    readonly enemyHealth: number,
    readonly enemyDefense: number,
    readonly abandoned: boolean,
  ) {}

  readonly isBattleOver =
    (this.playerDefense === 0 && this.playerHealth === 0) ||
    (this.enemyDefense === 0 && this.enemyHealth === 0) ||
    this.abandoned;
}
