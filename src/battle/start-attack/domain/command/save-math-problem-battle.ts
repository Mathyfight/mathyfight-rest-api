import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class SaveMathProblemBattle {
  constructor(readonly mathProblemId: string, readonly battleId: string) {}

  readonly id: string = Uuid.newPrimitive();
  readonly createdAt = new Date();
  readonly solved = false;
}
