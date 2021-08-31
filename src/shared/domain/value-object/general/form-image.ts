import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class FormImage {
  private constructor(readonly val: Express.Multer.File) {}

  static parse(
    val: Express.Multer.File | undefined,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): FormImage | null {
    if (val === undefined) {
      errors[prop]?.push('debe de incluir una imagen');
      return null;
    }

    return new FormImage(val);
  }
}
