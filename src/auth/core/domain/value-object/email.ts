import {
  DomainErrors,
  DomainErrorsProp,
} from '../../../../shared/domain/value-object/util/domain-errors';

export class Email {
  static ValidationError = class {
    static hasToBeAnEmail = 'debe tener el formato de un correo electrónico';
  };

  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Email | null {
    const compliesWithRfc5322 =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val,
      );
    if (!compliesWithRfc5322) {
      errors[prop]?.push(this.ValidationError.hasToBeAnEmail);
      return null;
    }

    return new Email(val.toLowerCase());
  }

  static fromExisting(email: string): Email {
    return new Email(email);
  }
}
