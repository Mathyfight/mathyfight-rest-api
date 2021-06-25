import { mathyfightEmail } from 'src/auth/core/domain/constants';

export class SendResetPasswordEmail {
  readonly fromEmail: string;
  readonly fromName: string;
  readonly subject: string;
  readonly text: string;

  constructor(resetPasswordTokenId: string, readonly toEmail: string) {
    this.fromEmail = mathyfightEmail;
    this.fromName = 'Mathyfight';
    this.subject = 'Reestablece tu contraseña';
    this.text = `Reestablece tu contraseña ingresando al siguiente enlace: https://mathyfight-api.herokuapp.com/reset-password/${resetPasswordTokenId}`;
  }
}
