import { Email } from 'src/auth/core/domain/value-object/email';
import { HashedPassword } from 'src/auth/core/domain/value-object/hashed-password';
import { Username } from 'src/auth/core/domain/value-object/username';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class User {
  constructor(
    readonly id: Uuid,
    readonly username: Username,
    readonly hashedPassword: HashedPassword,
    readonly email: Email,
  ) {}

  static new(
    username: Username,
    hashedPassword: HashedPassword,
    email: Email,
  ): User {
    return new User(Uuid.new(), username, hashedPassword, email);
  }
}
