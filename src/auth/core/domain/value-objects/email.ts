import { DomainErrors } from '../../../../shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from '../../../../shared/domain/value-objects/util/domain-errors-prop';

export class Email {
  static ValidationError = class {
    static hasToBeAnEmail = 'debe tener el formato de un correo electrónico';
  };

  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): Email | null {
    const compliesWithRfc5322 =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val,
      );

    if (!compliesWithRfc5322) {
      errors.add(this.ValidationError.hasToBeAnEmail, prop);
      return null;
    }

    return new Email(val);
  }
}
