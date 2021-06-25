export interface DomainErrors {
  errors: string[];
  username: string[];
  password: string[];
  email: string[];
  page: string[];
  userId: string[];
  equipmentId: string[];
  resetPasswordTokenId: string[];
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
}
