export class SendResetPasswordEmail {
  constructor(resetPasswordTokenId: string, readonly toEmail: string) {
    this.text = `Reestablece tu contraseña ingresando al siguiente enlace: https://mathyfight-api.herokuapp.com/reset-password/${resetPasswordTokenId}`;
  }

  readonly fromEmail = 'mathyfight@gmail.com';
  readonly fromName = 'Mathyfight';
  readonly subject = 'Reestablece tu contraseña';
  readonly text: string;
}
