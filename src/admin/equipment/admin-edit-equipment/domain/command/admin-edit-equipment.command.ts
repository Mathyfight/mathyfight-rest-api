import * as path from 'path';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';
import { AdminEditEquipmentErrors } from '../value-object/admin-edit-equipment.errors';
import { PersistEquipment } from './persist-equipment';

export class AdminEditEquipmentCommand {
  constructor(
    readonly persistEquipment: PersistEquipment,
    readonly uploadEquipmentImage: UploadImage | undefined,
  ) {}

  static readonly notFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';
  static readonly equipmentHasAvatars =
    'no debe haber sido comprado por un avatar';

  static new(
    user: User | null,
    equipment: Equipment | null,
    image: Express.Multer.File | undefined,
    name: string | undefined,
    description: string | undefined,
    buyPrice: number | undefined,
    attack: number | undefined,
    defense: number | undefined,
    isActive: boolean | undefined,
    errors: AdminEditEquipmentErrors,
  ): AdminEditEquipmentCommand | null {
    if (user === null) {
      errors.userId.push(this.notFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    if (equipment === null) {
      errors.equipmentId.push(this.notFound);
      return null;
    }

    if (isActive === false && equipment.avatarEquipmentIds.length > 0) {
      errors.equipmentId.push(this.equipmentHasAvatars);
      return null;
    }

    let imageName = undefined;
    if (image !== undefined) {
      const imageExtension = path.extname(image.originalname);
      imageName = `equipment_${equipment.id}${imageExtension}`;
    }

    return new AdminEditEquipmentCommand(
      new PersistEquipment(
        equipment.id,
        name,
        description,
        buyPrice,
        attack,
        defense,
        isActive,
        imageName,
      ),
      image === undefined || imageName === undefined
        ? undefined
        : new UploadImage(image, imageName),
    );
  }
}
