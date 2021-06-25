import { ChangeUserPassword } from '../../domain/command/change-user-password';
import { DisableToken } from '../../domain/command/disable-token';
import { ResetPasswordToken } from '../../domain/entity/reset-password-token';

export abstract class ResetPasswordRepository {
  abstract getTokenById(id: string): Promise<ResetPasswordToken | null>;
  abstract disableToken(command: DisableToken): Promise<void>;
  abstract changeUserPassword(command: ChangeUserPassword): Promise<void>;
}
