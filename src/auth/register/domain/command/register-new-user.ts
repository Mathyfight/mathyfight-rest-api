import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { RaceType } from 'src/shared/domain/value-object/avatar/race-type';

export class RegisterNewUser {
  readonly id: string;
  readonly hashedPassword: string;
  readonly player: Player;

  constructor(
    readonly password: string,
    readonly username: string,
    readonly email: string,
  ) {
    this.id = uuid.v4();
    this.hashedPassword = bcrypt.hashSync(password, 10);
    this.player = new Player(username);
  }
}

export class Player {
  readonly id: string;
  readonly gold: number;
  readonly avatar: Avatar;

  constructor(avatarName: string) {
    this.id = uuid.v4();
    this.gold = 1000;
    this.avatar = new Avatar(avatarName);
  }
}

export class Avatar {
  readonly id: string;
  readonly attack: number;
  readonly defense: number;
  readonly health: number;
  readonly level: number;
  readonly currentExperience: number;
  readonly color: string;
  readonly race: RaceType;

  constructor(readonly name: string) {
    this.id = uuid.v4();
    this.attack = 1;
    this.defense = 1;
    this.health = 10;
    this.level = 1;
    this.currentExperience = 0;
    this.color = 'E0AC69';
    this.race = RaceType.HumanMale;
  }
}
