import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class LoginErrors implements Partial<DomainErrors> {
  username: string[];
  password: string[];

  constructor() {
    this.username = [];
    this.password = [];
  }
}
