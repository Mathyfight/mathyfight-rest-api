import { HashedPassword } from 'src/auth/core/domain/value-object/hashed-password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class User {
  private constructor(
    readonly id: Uuid,
    readonly username: Username,
    readonly hashedPassword: HashedPassword,
  ) {}

  static fromExisting(
    id: string,
    username: string,
    hashedPassword: string,
  ): User {
    return new User(
      Uuid.fromExisting(id),
      Username.fromExisting(username),
      HashedPassword.fromExisting(hashedPassword),
    );
  }
}
