export abstract class DomainErrors {
  abstract errors: string[];
  abstract username: string[];
  abstract password: string[];
  abstract email: string[];
  abstract page: string[];
  abstract userId: string[];
  abstract equipmentId: string[];
  abstract resetPasswordTokenId: string[];
  abstract avatarEquipmentId: string[];

  static isEmpty(errors: Partial<DomainErrors>): boolean {
    return Object.values(errors).every((prop) => prop.length === 0);
  }
}

export enum DomainErrorsProp {
  errors = 'errors',
  username = 'username',
  password = 'password',
  email = 'email',
  page = 'page',
  userId = 'userId',
  equipmentId = 'equipmentId',
  resetPasswordTokenId = 'resetPasswordTokenId',
  avatarEquipmentId = 'avatarEquipmentId',
}
