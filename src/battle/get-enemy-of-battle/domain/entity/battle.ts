import { Enemy } from './enemy';

export class Battle {
  constructor(readonly userId: string, readonly enemy: Enemy) {}
}
