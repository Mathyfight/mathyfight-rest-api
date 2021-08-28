export class Battle {
  constructor(
    readonly id: string,
    readonly enemyHealth: number,
    readonly avatarHealth: number,
    readonly abandoned: boolean,
    readonly avatarId: string,
  ) {}

  readonly finished =
    this.enemyHealth === 0 || this.avatarHealth === 0 || this.abandoned;
}
