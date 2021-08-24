import { Equipment } from './equipment';

export class Avatar {
  constructor(
    readonly raceId: string,
    readonly name: string,
    readonly maxHealth: number,
    readonly baseAttack: number,
    readonly baseDefense: number,
    readonly imageUrl: string,
    readonly color: string,
    readonly helmet: Equipment | null,
    readonly chestplate: Equipment | null,
    readonly leggings: Equipment | null,
    readonly boots: Equipment | null,
    readonly shield: Equipment | null,
    readonly weapon: Equipment | null,
    readonly currentExperience: number,
    readonly level: number,
  ) {}

  readonly totalExperience = this.level * 100;

  readonly attack =
    this.baseAttack +
    (this.helmet === null ? 0 : this.helmet.attack) +
    (this.chestplate === null ? 0 : this.chestplate.attack) +
    (this.leggings === null ? 0 : this.leggings.attack) +
    (this.boots === null ? 0 : this.boots.attack) +
    (this.weapon === null ? 0 : this.weapon.attack) +
    (this.shield === null ? 0 : this.shield.attack);

  readonly defense =
    this.baseDefense +
    (this.helmet === null ? 0 : this.helmet.defense) +
    (this.chestplate === null ? 0 : this.chestplate.defense) +
    (this.leggings === null ? 0 : this.leggings.defense) +
    (this.boots === null ? 0 : this.boots.defense) +
    (this.weapon === null ? 0 : this.weapon.defense) +
    (this.shield === null ? 0 : this.shield.defense);
}
