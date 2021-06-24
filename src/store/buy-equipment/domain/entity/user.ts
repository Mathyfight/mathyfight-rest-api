import { Player } from './player';

export class User {
  constructor(readonly player: Player | null) {}
}
