import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class LoginErrors implements Partial<DomainErrors> {
  username: string[];
  password: string[];
  errors: string[];

  constructor() {
    this.username = [];
    this.password = [];
    this.errors = [];
  }
}
