import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Avatar } from './avatar';

export class Player {
  constructor(
    readonly id: Uuid,
    readonly gold: number,
    readonly avatar: Avatar,
  ) {}

  static new(name: string): Player {
    return new Player(Uuid.new(), 0, Avatar.new(name));
  }
}
