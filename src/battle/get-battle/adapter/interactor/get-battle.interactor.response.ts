export class GetBattleInteractorResponse {
  constructor(
    readonly playerHealth: number,
    readonly playerDefense: number,
    readonly enemyHealth: number,
    readonly enemyDefense: number,
    readonly playerWon: boolean | null,
    readonly levelUp: GetBattleLevelUpInteractorResponse | null,
    readonly nextLevelId: string | null,
  ) {}
}

export class GetBattleLevelUpInteractorResponse {
  constructor(
    readonly health: number,
    readonly attack: number,
    readonly defense: number,
  ) {}
}
