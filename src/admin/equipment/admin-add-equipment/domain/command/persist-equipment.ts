import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';

export class PersistEquipment {
  readonly imageUrl: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly buyPrice: number,
    readonly attack: number,
    readonly defense: number,
    readonly type: EquipmentType,
    imageName: string,
  ) {
    this.imageUrl = `https://${process.env.MATHYFIGHT_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER}/${imageName}`;
  }
}
