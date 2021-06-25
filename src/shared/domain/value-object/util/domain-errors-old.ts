import { DomainErrorsProp } from './domain-errors';

export class DomainErrorsOld {
  private errors: Record<string, string[]>;

  constructor() {
    this.errors = {};
  }

  add(error: string, key: DomainErrorsProp): void {
    if (this.errors[key] == null) this.errors[key] = [];
    this.errors[key] = [...this.errors[key], error];
  }

  get isNotEmpty(): boolean {
    return Object.keys(this.errors).length > 0;
  }
}
