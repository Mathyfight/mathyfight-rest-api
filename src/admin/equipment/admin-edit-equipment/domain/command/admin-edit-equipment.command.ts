import * as path from 'path';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { User } from '../entity/user';
import { AdminEditEquipmentErrors } from '../value-object/admin-edit-equipment.errors';
import { PersistEquipment } from './persist-equipment';

export class AdminEditEquipmentCommand {
  constructor(
    readonly persistEquipment: PersistEquipment,
    readonly uploadEquipmentImage: UploadImage | undefined,
  ) {}

  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    equipmentId: string,
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
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    let imageName = undefined;
    if (image !== undefined) {
      const imageExtension = path.extname(image.originalname);
      imageName = `equipment_${equipmentId}${imageExtension}`;
    }

    return new AdminEditEquipmentCommand(
      new PersistEquipment(
        equipmentId,
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
