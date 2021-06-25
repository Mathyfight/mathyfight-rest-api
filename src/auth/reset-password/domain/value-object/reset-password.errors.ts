import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class ResetPasswordErrors implements Partial<DomainErrors> {
  resetPasswordTokenId: string[];
  password: string[];

  constructor() {
    this.resetPasswordTokenId = [];
    this.password = [];
  }
}
