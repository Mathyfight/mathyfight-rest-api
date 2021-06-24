import { Equipment } from './equipment';

export class Player {
  constructor(
    readonly id: string,
    readonly gold: number,
    readonly inventory: Equipment[],
    readonly avatarId: string,
  ) {}
}
