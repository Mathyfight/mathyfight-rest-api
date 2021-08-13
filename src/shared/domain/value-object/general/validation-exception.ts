import { BadRequestException } from '@nestjs/common';
import { DomainErrors } from '../util/domain-errors';

export class ValidationException extends BadRequestException {
  constructor(errors: Partial<DomainErrors>) {
    super({ errors: errors });
  }
}
