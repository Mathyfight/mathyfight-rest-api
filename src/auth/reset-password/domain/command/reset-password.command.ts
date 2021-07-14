import { ResetPasswordToken } from '../entity/reset-password-token';
import { ResetPasswordErrors } from '../value-object/reset-password.errors';
import { ChangeUserPassword } from './change-user-password';
import { DisableToken } from './disable-token';

export class ResetPasswordCommand {
  static readonly tokenDoesNotExist = 'no existe';
  static readonly tokenHasBeenUsed = 'ya fue utilizado';

  private constructor(
    readonly changeUserPassword: ChangeUserPassword,
    readonly disableToken: DisableToken,
  ) {}

  static new(
    token: ResetPasswordToken | null,
    password: string,
    errors: ResetPasswordErrors,
  ): ResetPasswordCommand | null {
    if (token === null) {
      errors.resetPasswordTokenId.push(this.tokenDoesNotExist);
      return null;
    }

    if (token.hasBeenUsed) {
      errors.resetPasswordTokenId.push(this.tokenHasBeenUsed);
      return null;
    }

    return new ResetPasswordCommand(
      new ChangeUserPassword(token.userId, password),
      new DisableToken(token.id),
    );
  }
}
