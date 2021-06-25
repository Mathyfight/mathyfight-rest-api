import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class RegisterErrors implements Partial<DomainErrors> {
  username: string[];
  password: string[];
  email: string[];

  constructor() {
    this.username = [];
    this.password = [];
    this.email = [];
  }
}
