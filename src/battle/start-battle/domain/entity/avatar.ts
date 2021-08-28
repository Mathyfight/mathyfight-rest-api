import { Equipment } from './equipment';

export class Avatar {
  constructor(
    readonly id: string,
    readonly maxHealth: number,
    readonly baseDefense: number,
    readonly playerId: string,
    readonly equippedEquipments: Equipment[],
  ) {}

  readonly defense = this.equippedEquipments.reduce(
    (acc, curr) => acc + curr.defense,
    this.baseDefense,
  );
}
