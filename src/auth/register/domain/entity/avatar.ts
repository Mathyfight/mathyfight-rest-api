import { RaceType } from 'src/shared/domain/value-object/avatar/race-type';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class Avatar {
  constructor(
    readonly id: Uuid,
    readonly name: string,
    readonly attack: number,
    readonly defense: number,
    readonly health: number,
    readonly level: number,
    readonly currentExperience: number,
    readonly color: string,
    readonly race: RaceType,
  ) {}

  static new(name: string): Avatar {
    return new Avatar(
      Uuid.new(),
      name,
      1,
      1,
      10,
      1,
      0,
      'E0AC69',
      RaceType.HumanMale,
    );
  }
}
