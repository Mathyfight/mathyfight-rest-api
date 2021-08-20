import { Avatar } from './avatar';

export class User {
  constructor(readonly id: string, readonly avatar: Avatar | null) {}
}
