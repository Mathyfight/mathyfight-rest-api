import { DomainErrorsProp } from './domain-errors-prop';

export class DomainErrors {
  private errors: Record<string, string[]>;

  constructor() {
    this.errors = {};
  }

  add(error: string, key?: DomainErrorsProp): void {
    let recordKey = '_';
    if (key !== undefined) recordKey = key;
    if (this.errors[recordKey] == null) this.errors[recordKey] = [];
    this.errors[recordKey] = [...this.errors[recordKey], error];
  }
}
