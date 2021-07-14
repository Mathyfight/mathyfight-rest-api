import { RegisterCommand } from '../../domain/command/register.command';

export abstract class RegisterRepository {
  abstract getOneUserIdByUsername(username: string): Promise<string | null>;
  abstract getOneUserIdByEmail(email: string): Promise<string | null>;
  abstract registerNewUser(cmd: RegisterCommand): Promise<void>;
}
