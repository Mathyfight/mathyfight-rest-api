import { HashedPassword } from 'src/auth/core/domain/value-objects/hashed-password';
import { Uuid } from 'src/shared/domain/value-objects/general/uuid';
import { UniqueEmail } from '../value-objects/unique-email';
import { UniqueUsername } from '../value-objects/unique-username';

export class User {
  constructor(
    readonly id: Uuid,
    readonly username: UniqueUsername,
    readonly hashedPassword: HashedPassword,
    readonly email: UniqueEmail,
  ) {}

  static new(
    username: UniqueUsername,
    hashedPassword: HashedPassword,
    email: UniqueEmail,
  ): User {
    return new User(Uuid.new(), username, hashedPassword, email);
  }

  static fromExisting(
    id: string,
    username: string,
    hashedPassword: string,
    email: string,
  ): User {
    return new User(
      Uuid.fromExisting(id),
      UniqueUsername.fromExisting(username),
      HashedPassword.fromExisting(hashedPassword),
      UniqueEmail.fromExisting(email),
    );
  }
}
