import { ResetPasswordCommand } from '../../domain/command/reset-password.command';
import { ResetPasswordToken } from '../../domain/entity/reset-password-token';

export abstract class ResetPasswordRepository {
  abstract getTokenById(id: string): Promise<ResetPasswordToken | null>;
  abstract resetPassword(cmd: ResetPasswordCommand): Promise<void>;
}
