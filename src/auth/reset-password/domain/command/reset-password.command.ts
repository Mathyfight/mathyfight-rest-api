import { ChangeUserPassword } from './change-user-password';
import { DisableToken } from './disable-token';

export class ResetPasswordCommand {
  constructor(
    readonly changeUserPassword: ChangeUserPassword,
    readonly disableToken: DisableToken,
  ) {}
}
