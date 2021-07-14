import { Username } from 'src/auth/core/domain/value-object/username';
import { User } from '../../domain/entity/user';

export abstract class LoginRepository {
  abstract getOneUserByUsername(username: Username): Promise<User | null>;
}
