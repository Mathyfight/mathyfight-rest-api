import { HashedPassword } from '../../../../auth/core/domain/value-object/hashed-password';
import { RaceType } from '../../../../shared/domain/value-object/avatar/race-type';
import { Uuid } from '../../../../shared/domain/value-object/general/uuid';

export class RegisterNewUser {
  constructor(
    password: string,
    readonly username: string,
    readonly email: string,
  ) {
    this.hashedPassword = HashedPassword.newPrimitive(password);
  }

  readonly id: string = Uuid.newPrimitive();
  readonly hashedPassword: string;
  readonly player = new NewPlayer(this.username);
}

export class NewPlayer {
  constructor(avatarName: string) {
    this.avatar = new NewAvatar(avatarName);
  }

  readonly id: string = Uuid.newPrimitive();
  readonly gold = 1000;
  readonly avatar: NewAvatar;
}

export class NewAvatar {
  constructor(readonly name: string) {}

  readonly id: string = Uuid.newPrimitive();
  readonly attack = 1;
  readonly defense = 1;
  readonly health = 10;
  readonly level = 1;
  readonly currentExperience = 0;
  readonly color = 'E0AC69';
  readonly race = RaceType.HumanMale;
}
