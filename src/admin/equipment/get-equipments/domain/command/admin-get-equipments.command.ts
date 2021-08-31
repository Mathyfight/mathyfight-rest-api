import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';
import { AdminGetEquipmentsErrors } from '../value-object/admin-get-equipments.errors';

export class AdminGetEquipmentsCommand {
  constructor(readonly equipments: Equipment[]) {}

  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    equipments: Equipment[],
    errors: AdminGetEquipmentsErrors,
  ): AdminGetEquipmentsCommand | null {
    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    return new AdminGetEquipmentsCommand(equipments);
  }
}
