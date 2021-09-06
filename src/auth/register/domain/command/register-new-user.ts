import { HashedPassword } from '../../../../auth/core/domain/value-object/hashed-password';
import { Uuid } from '../../../../shared/domain/value-object/general/uuid';

export class RegisterNewUser {
  constructor(
    password: string,
    raceId: string,
    mathTopicLevelIds: string[],
    readonly username: string,
    readonly email: string,
  ) {
    this.hashedPassword = HashedPassword.newPrimitive(password);
    this.player = new NewPlayer(this.username, raceId, mathTopicLevelIds);
  }

  readonly id: string = Uuid.newPrimitive();
  readonly isAdmin = false;
  readonly hashedPassword: string;
  readonly player: NewPlayer;
}

export class NewPlayer {
  constructor(avatarName: string, raceId: string, mathTopicLevelIds: string[]) {
    this.avatar = new NewAvatar(avatarName, raceId);
    this.unlockedLevels = mathTopicLevelIds.map((id) => new UnlockedLevel(id));
  }

  readonly id: string = Uuid.newPrimitive();
  readonly gold = 0;
  readonly avatar: NewAvatar;
  readonly unlockedLevels: UnlockedLevel[];
}

export class NewAvatar {
  constructor(readonly name: string, readonly raceId: string) {}

  readonly id: string = Uuid.newPrimitive();
  readonly attack = 1;
  readonly defense = 1;
  readonly health = 3;
  readonly level = 1;
  readonly currentExperience = 0;
  readonly color = 'E0AC69';
}

export class UnlockedLevel {
  constructor(readonly mathTopicLevelId: string) {}

  readonly id: string = Uuid.newPrimitive();
}
