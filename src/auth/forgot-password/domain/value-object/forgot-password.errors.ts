import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class ForgotPasswordErrors implements Partial<DomainErrors> {
  email: string[] = [];
}
