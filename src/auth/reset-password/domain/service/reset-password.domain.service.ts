import { ChangeUserPassword } from '../command/change-user-password';
import { DisableToken } from '../command/disable-token';
import { ResetPasswordCommand } from '../command/reset-password.command';
import { ResetPasswordToken } from '../entity/reset-password-token';
import { ResetPasswordErrors } from '../value-object/reset-password.errors';

export class ResetPasswordDomainService {
  tokenDoesNotExist = 'no existe';
  tokenHasBeenUsed = 'ya fue utilizado';

  invoke(
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
