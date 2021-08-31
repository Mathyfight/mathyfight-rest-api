import * as path from 'path';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { UploadImage } from 'src/shared/domain/value-object/general/upload-image';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { User } from '../entity/user';
import { AdminAddEquipmentErrors } from '../value-object/admin-add-equipment.errors';
import { PersistEquipment } from './persist-equipment';

export class AdminAddEquipmentCommand {
  constructor(
    readonly persistEquipment: PersistEquipment,
    readonly uploadEquipmentImage: UploadImage,
  ) {}

  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    image: Express.Multer.File,
    name: string,
    description: string,
    buyPrice: number,
    attack: number,
    defense: number,
    type: EquipmentType,
    errors: AdminAddEquipmentErrors,
  ): AdminAddEquipmentCommand | null {
    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    const equipmentId = Uuid.newPrimitive();
    const imageExtension = path.extname(image.originalname);
    const imageName = `equipment_${equipmentId}${imageExtension}`;

    return new AdminAddEquipmentCommand(
      new PersistEquipment(
        equipmentId,
        name,
        description,
        buyPrice,
        attack,
        defense,
        type,
        imageName,
      ),
      new UploadImage(image, imageName),
    );
  }
}
